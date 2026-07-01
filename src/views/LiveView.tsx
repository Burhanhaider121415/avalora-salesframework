import React, { useState, useEffect, useMemo } from 'react';
import { livePaths } from '../data/livePaths';
import type { NoteContext, Workspace } from '../types/app';

interface LiveViewProps {
  workspace: Workspace;
  scenario: string | null;
  onReset: () => void;
  onGoToLibrary: () => void;
  onOpenNotes?: (context: NoteContext) => void;
}

const LiveView: React.FC<LiveViewProps> = ({ workspace, scenario, onReset, onGoToLibrary, onOpenNotes }) => {
  const [currentScenarioId, setCurrentScenarioId] = useState<string | null>(scenario);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  
  // Build ordered node array for sequential navigation
  const nodeOrder = useMemo(() => {
    if (!currentScenarioId || !livePaths[currentScenarioId]) return [];
    return Object.keys(livePaths[currentScenarioId].nodes);
  }, [currentScenarioId]);

  const currentIndex = useMemo(() => {
    if (!currentNodeId) return -1;
    return nodeOrder.indexOf(currentNodeId);
  }, [currentNodeId, nodeOrder]);

  const isFirstStep = currentIndex <= 0;
  const isLastStep = currentIndex >= nodeOrder.length - 1;

  // Update state when props change
  useEffect(() => {
    setCurrentScenarioId(scenario);
    if (scenario && livePaths[scenario]) {
      setCurrentNodeId(livePaths[scenario].initialNode);
      setHistory([]);
    } else {
      setCurrentNodeId(null);
      setHistory([]);
    }
  }, [scenario, workspace]);

  const handleSelectScenario = (id: string) => {
    if (livePaths[id]) {
      setCurrentScenarioId(id);
      setCurrentNodeId(livePaths[id].initialNode);
      setHistory([]);
    }
  };

  const handleNextStep = () => {
    if (!currentNodeId || isLastStep) return;
    setHistory(prev => [...prev, currentNodeId]);
    setCurrentNodeId(nodeOrder[currentIndex + 1]);
  };

  const handleBackStep = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setCurrentNodeId(prev);
    } else if (!isFirstStep) {
      setCurrentNodeId(nodeOrder[currentIndex - 1]);
    }
  };

  const handleBranch = (target: string) => {
    if (!currentScenarioId || !currentNodeId) return;
    const path = livePaths[currentScenarioId];
    if (!path) return;

    // Cross-scenario transitions
    if (currentScenarioId === 'medspa_gatekeeper' && target === 'owner_answers_placeholder') {
      setHistory(prev => [...prev, currentNodeId]);
      setCurrentScenarioId('medspa_owner');
      setCurrentNodeId(livePaths.medspa_owner.initialNode);
      return;
    }

    if (currentScenarioId === 'partner_gatekeeper' && target === 'partner_answers') {
      setHistory(prev => [...prev, currentNodeId]);
      setCurrentScenarioId('partner_live');
      setCurrentNodeId(livePaths.partner_live.initialNode);
      return;
    }

    if (target === 'next') {
      handleNextStep();
      return;
    }

    if (target === 'back') {
      handleBackStep();
      return;
    }

    if (target === 'done' || target === 'disposition') {
      onReset();
      return;
    }

    // Branch to a specific node
    if (path.nodes[target]) {
      setHistory(prev => [...prev, currentNodeId]);
      setCurrentNodeId(target);
    }
  };

  // ─── Live Landing (no scenario selected) ───
  if (!currentScenarioId || !livePaths[currentScenarioId] || livePaths[currentScenarioId].workspace !== workspace) {
    const availablePaths = Object.values(livePaths).filter(p => p.workspace === workspace);
    
    return (
      <div className="flex-col gap-6 pb-6">
        <div className="mb-4">
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Live Mode Execution</h2>
          <p style={{ color: 'var(--color-muted-sage)', fontSize: '16px' }}>Select the current live situation to begin.</p>
        </div>
        
        <div className="flex-col gap-4">
          {availablePaths.map(path => (
            <button 
              key={path.id}
              className="card btn-secondary" 
              onClick={() => handleSelectScenario(path.id)} 
              style={{ textAlign: 'left', padding: '20px', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '18px', fontWeight: 600 }}>{path.name}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── Active Live Mode Step ───
  const path = livePaths[currentScenarioId];
  const node = currentNodeId ? path.nodes[currentNodeId] : null;

  if (!node) {
    return <div>Error: Step not found.</div>;
  }

  const isMedSpa = workspace === 'medspa';
  const accentColor = isMedSpa ? 'var(--color-soft-amber)' : 'var(--color-muted-sage)';
  let notesContext: NoteContext = workspace === 'partner' ? 'partner' : 'gatekeeper';

  if (currentScenarioId === 'medspa_owner') notesContext = 'owner';
  if (currentScenarioId === 'fit_call') notesContext = 'fit_call';
  if (currentScenarioId === 'sales_demo') notesContext = 'demo';

  // Filter branch buttons that are not 'next' or 'back' (those are handled by dedicated buttons)
  const branchButtons = node.branchButtons.filter(
    btn => btn.target !== 'next' && btn.target !== 'back'
  );

  return (
    <div className="flex-col" style={{ paddingBottom: '120px' }}>
      {/* Step progress bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="live-step-progress">
          <span className="step-indicator">Step {currentIndex + 1} of {nodeOrder.length}</span>
          <span>{path.name}</span>
        </div>
      </div>

      {/* Stage badge */}
      <div className="mb-4" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ 
          fontSize: '13px', 
          fontWeight: 600, 
          padding: '5px 12px', 
          borderRadius: '6px',
          backgroundColor: accentColor,
          color: '#fff'
        }}>
          {node.stage}
        </span>
      </div>

      {/* Goal */}
      <div className="mb-4">
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-muted-sage)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Goal
        </span>
        <p style={{ fontSize: '16px', color: 'var(--color-deep-charcoal)', marginTop: '4px', lineHeight: 1.5 }}>
          {node.goal}
        </p>
      </div>

      {/* Script / Say-This card */}
      <div className="card" style={{ minHeight: '160px', borderLeft: `4px solid ${accentColor}`, marginBottom: '20px' }}>
        {node.useWhen && (
          <p style={{ fontSize: '14px', color: 'var(--color-muted-sage)', marginBottom: '12px', fontStyle: 'italic' }}>
            Use when: {node.useWhen}
          </p>
        )}
        <p className="script-text" style={{ whiteSpace: 'pre-wrap', fontWeight: 500, lineHeight: 1.55 }}>
          {node.sayThis}
        </p>
        {node.instructions && node.instructions.length > 0 && (
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--color-light-gray)' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-muted-sage)', textTransform: 'uppercase' }}>Instructions</span>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              {node.instructions.map((inst, i) => (
                <li key={i} style={{ fontSize: '14px', lineHeight: 1.5, marginBottom: '4px', color: 'var(--color-deep-charcoal)' }}>
                  {inst}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── Primary Navigation: Back + Next Framework Step ── */}
      <div className="live-nav-row">
        <button
          className="btn-back-step"
          onClick={handleBackStep}
          disabled={isFirstStep && history.length === 0}
          style={{ opacity: (isFirstStep && history.length === 0) ? 0.4 : 1 }}
        >
          ← Back
        </button>
        <button
          className="btn-next-step"
          onClick={handleNextStep}
          disabled={isLastStep}
          style={{ opacity: isLastStep ? 0.4 : 1 }}
        >
          Next Framework Step →
        </button>
      </div>

      {/* ── Branch/Outcome Buttons ── */}
      {branchButtons.length > 0 && (
        <div className="live-branch-section">
          <h3>What happened? / Outcome</h3>
          <div className="flex-col gap-3">
            {branchButtons.map((btn) => (
              <button 
                key={btn.id} 
                className="btn btn-secondary" 
                onClick={() => handleBranch(btn.target)}
                style={{ justifyContent: 'flex-start', padding: '12px 20px', fontSize: '15px' }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Action Bar */}
      <div style={{
        position: 'sticky',
        bottom: '0',
        backgroundColor: '#fff',
        padding: '12px 0',
        borderTop: '1px solid var(--color-light-gray)',
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-between',
        zIndex: 10,
        marginTop: '28px'
      }}>
        {onOpenNotes && (
          <button className="btn" onClick={() => onOpenNotes(notesContext)} style={{ flex: 1, padding: '10px', fontSize: '14px', backgroundColor: 'transparent', color: 'var(--color-deep-charcoal)', border: '1px solid var(--color-light-gray)', fontFamily: 'inherit', cursor: 'pointer', borderRadius: '8px' }}>
            Quick Notes
          </button>
        )}
        <button className="btn" onClick={onGoToLibrary} style={{ flex: 1, padding: '10px', fontSize: '14px', backgroundColor: 'transparent', color: 'var(--color-deep-charcoal)', border: '1px solid var(--color-light-gray)', fontFamily: 'inherit', cursor: 'pointer', borderRadius: '8px' }}>
          Full Framework
        </button>
      </div>
    </div>
  );
};

export default LiveView;
