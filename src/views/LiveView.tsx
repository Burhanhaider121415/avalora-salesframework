import React, { useEffect, useState } from 'react';
import { livePaths } from '../data/livePaths';
import NotesView from './NotesView';
import type { NoteContext, Workspace } from '../types/app';

interface LiveViewProps {
  workspace: Workspace;
  scenario: string | null;
  onReset: () => void;
  onGoToLibrary: () => void;
  onOpenNotes?: (context: NoteContext) => void;
}

function getNotesContext(scenario: string, workspace: Workspace): NoteContext {
  if (workspace === 'partner') return 'partner';
  if (scenario === 'medspa_owner') return 'owner';
  if (scenario === 'fit_call') return 'fit_call';
  if (scenario === 'sales_demo') return 'demo';
  return 'gatekeeper';
}

const LiveView: React.FC<LiveViewProps> = ({ workspace, scenario, onReset, onGoToLibrary }) => {
  const [currentScenarioId, setCurrentScenarioId] = useState<string | null>(scenario);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [notesOpen, setNotesOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    setCurrentScenarioId(scenario);
    setCurrentNodeId(scenario && livePaths[scenario] ? livePaths[scenario].initialNode : null);
    setHistory([]);
    setNotesOpen(false);
  }, [scenario, workspace]);

  const selectScenario = (id: string) => {
    setCurrentScenarioId(id);
    setCurrentNodeId(livePaths[id].initialNode);
    setHistory([]);
  };

  const handleBranch = (target: string) => {
    if (!currentScenarioId || !currentNodeId) return;
    if (target === 'disposition' || target === 'done') return onReset();
    if (target === 'back') {
      const previous = history.at(-1);
      if (previous) {
        setHistory((items) => items.slice(0, -1));
        setCurrentNodeId(previous);
      }
      return;
    }
    if (currentScenarioId === 'medspa_gatekeeper' && target === 'owner_answers_placeholder') {
      setHistory((items) => [...items, currentNodeId]);
      setCurrentScenarioId('medspa_owner');
      setCurrentNodeId(livePaths.medspa_owner.initialNode);
      return;
    }
    if (currentScenarioId === 'partner_gatekeeper' && target === 'partner_answers') {
      setHistory((items) => [...items, currentNodeId]);
      setCurrentScenarioId('partner_live');
      setCurrentNodeId(livePaths.partner_live.initialNode);
      return;
    }
    const path = livePaths[currentScenarioId];
    if (target === 'next') {
      const nodeIds = Object.keys(path.nodes);
      const nextId = nodeIds[nodeIds.indexOf(currentNodeId) + 1];
      if (nextId) {
        setHistory((items) => [...items, currentNodeId]);
        setCurrentNodeId(nextId);
      }
      return;
    }
    if (path.nodes[target]) {
      setHistory((items) => [...items, currentNodeId]);
      setCurrentNodeId(target);
    }
  };

  if (!currentScenarioId || !livePaths[currentScenarioId] || livePaths[currentScenarioId].workspace !== workspace) {
    const available = workspace === 'medspa'
      ? ['medspa_gatekeeper', 'medspa_owner']
      : ['partner_gatekeeper'];
    return (
      <div className="flex-col gap-4 pb-6">
        <div className="mb-4">
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Live Call</h2>
          <p style={{ color: 'var(--color-muted-sage)' }}>Choose the person currently on the phone.</p>
        </div>
        {available.map((id) => (
          <button key={id} className="card btn-secondary" onClick={() => selectScenario(id)} style={{ textAlign: 'left', padding: '20px' }}>
            <span style={{ fontSize: '18px', fontWeight: 600 }}>{livePaths[id].name}</span>
          </button>
        ))}
      </div>
    );
  }

  const path = livePaths[currentScenarioId];
  const node = currentNodeId ? path.nodes[currentNodeId] : null;
  if (!node) return <div className="card">The selected call step is unavailable.</div>;
  const outcomes = node.branchButtons.filter((button) => button.target !== 'back');
  const notesContext = getNotesContext(currentScenarioId, workspace);

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(node.sayThis);
      setCopyStatus('Copied');
    } catch {
      setCopyStatus('Copy failed');
    }
    window.setTimeout(() => setCopyStatus(''), 1800);
  };

  return (
    <div className="flex-col gap-4" style={{ paddingBottom: '112px' }}>
      <div className="live-step-progress"><span>{path.name}</span></div>
      <div>
        <span className="label-text">Stage</span>
        <h2 style={{ fontSize: '25px', marginTop: '4px' }}>{node.stage}</h2>
      </div>
      <div>
        <span className="label-text">Goal</span>
        <p style={{ marginTop: '5px', lineHeight: 1.5 }}>{node.goal}</p>
      </div>
      <div className="card" style={{ borderLeft: '4px solid var(--color-soft-amber)' }}>
        {node.useWhen && <p style={{ color: 'var(--color-muted-sage)', fontStyle: 'italic', marginBottom: '12px' }}>Use when: {node.useWhen}</p>}
        <span className="label-text">Say this</span>
        <p className="script-text" style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}>{node.sayThis}</p>
        <button className="btn btn-secondary" onClick={() => void copyScript()} style={{ width: 'auto', minHeight: '38px', marginTop: '16px', fontSize: '13px' }}>{copyStatus || 'Copy'}</button>
      </div>
      {node.instructions?.length ? (
        <details className="card" style={{ padding: '16px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Listen for / guidance</summary>
          <ul style={{ margin: '12px 0 0', paddingLeft: '20px' }}>{node.instructions.slice(0, 3).map((item) => <li key={item} style={{ marginBottom: '6px' }}>{item}</li>)}</ul>
        </details>
      ) : null}
      {outcomes.length > 0 && (
        <section className="live-branch-section">
          <h3>What happened?</h3>
          <div className="flex-col gap-2">
            {outcomes.map((button) => {
              const nodeIds = Object.keys(path.nodes);
              const nextNode = button.target === 'next' ? path.nodes[nodeIds[nodeIds.indexOf(node.id) + 1]] : null;
              const label = button.target === 'next' && nextNode ? `Next: ${nextNode.stage}` : button.label;
              return <button key={button.id} className="btn btn-secondary" onClick={() => handleBranch(button.target)} style={{ justifyContent: 'flex-start', textAlign: 'left' }}>{label}</button>;
            })}
          </div>
        </section>
      )}
      {history.length > 0 && <button className="btn btn-secondary" onClick={() => handleBranch('back')}>Back to previous situation</button>}
      <div style={{ position: 'sticky', bottom: 0, display: 'flex', gap: '8px', background: 'var(--color-warm-ivory)', padding: '12px 0', borderTop: '1px solid var(--color-light-gray)' }}>
        <button className="btn btn-secondary" onClick={() => setNotesOpen(true)}>Quick Notes</button>
        <button className="btn btn-secondary" onClick={onGoToLibrary}>Full Framework</button>
      </div>
      {notesOpen && (
        <aside role="dialog" aria-label="Quick Notes" style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 'min(380px, 100vw)', background: '#fff', boxShadow: '-8px 0 28px rgba(0,0,0,.14)', zIndex: 50, borderLeft: '1px solid var(--color-light-gray)' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 12px 0' }}><button onClick={() => setNotesOpen(false)} aria-label="Close notes" style={{ border: 0, background: 'transparent', fontSize: '24px', cursor: 'pointer' }}>×</button></div>
          <NotesView workspace={workspace} initialContext={notesContext} isSidePanel />
        </aside>
      )}
    </div>
  );
};

export default LiveView;
