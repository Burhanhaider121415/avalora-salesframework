import React, { useState, useEffect } from 'react';
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
  
  // Update state when props change
  useEffect(() => {
    setCurrentScenarioId(scenario);
    if (scenario && livePaths[scenario]) {
      setCurrentNodeId(livePaths[scenario].initialNode);
    } else {
      setCurrentNodeId(null);
    }
  }, [scenario, workspace]);

  const handleSelectScenario = (id: string) => {
    if (livePaths[id]) {
      setCurrentScenarioId(id);
      setCurrentNodeId(livePaths[id].initialNode);
    }
  };

  const handleAction = (target: string) => {
    if (!currentScenarioId || !currentNodeId) return;
    const path = livePaths[currentScenarioId];
    if (!path) return;

    if (currentScenarioId === 'medspa_gatekeeper' && target === 'owner_answers_placeholder') {
      setCurrentScenarioId('medspa_owner');
      setCurrentNodeId(livePaths.medspa_owner.initialNode);
      return;
    }

    if (currentScenarioId === 'partner_gatekeeper' && target === 'partner_answers') {
      setCurrentScenarioId('partner_live');
      setCurrentNodeId(livePaths.partner_live.initialNode);
      return;
    }

    if (target === 'next' || target === 'back') {
      // Basic linear navigation based on node order logic could go here,
      // but we specified specific targets in the data except for linear ones where we just used 'next'/'back'.
      // Wait, in my livePaths, for linear I used 'next' and 'back', but I didn't specify the explicit next ID.
      // Let's implement a simple array-based lookup for linear step modes.
      const nodesArray = Object.values(path.nodes);
      const currentIndex = nodesArray.findIndex(n => n.id === currentNodeId);
      if (target === 'next' && currentIndex < nodesArray.length - 1) {
        setCurrentNodeId(nodesArray[currentIndex + 1].id);
      } else if (target === 'back' && currentIndex > 0) {
        setCurrentNodeId(nodesArray[currentIndex - 1].id);
      }
    } else if (target === 'done' || target === 'disposition') {
      // Show end state or reset
      onReset();
    } else if (path.nodes[target]) {
      setCurrentNodeId(target);
    }
  };

  if (!currentScenarioId || !livePaths[currentScenarioId] || livePaths[currentScenarioId].workspace !== workspace) {
    // Show Live Landing
    const availablePaths = Object.values(livePaths).filter(p => p.workspace === workspace);
    
    return (
      <div className="flex-col gap-6 pb-6">
        <div className="mb-4">
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Live Mode Execution</h2>
          <p style={{ color: 'var(--color-muted-sage)' }}>Select the current live situation to begin.</p>
        </div>
        
        <div className="flex-col gap-4">
          {availablePaths.map(path => (
            <button 
              key={path.id}
              className="card btn-secondary" 
              onClick={() => handleSelectScenario(path.id)} 
              style={{ textAlign: 'left', padding: '16px' }}
            >
              <div style={{ fontSize: '18px', fontWeight: 600 }}>{path.name}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const path = livePaths[currentScenarioId];
  const node = currentNodeId ? path.nodes[currentNodeId] : null;

  if (!node) {
    return <div>Error: Step not found.</div>;
  }

  const isMedSpa = workspace === 'medspa';
  const accentColor = isMedSpa ? 'var(--color-accent-amber)' : 'var(--color-accent-sage)';
  let notesContext: NoteContext = workspace === 'partner' ? 'partner' : 'gatekeeper';

  if (currentScenarioId === 'medspa_owner') {
    notesContext = 'owner';
  }

  if (currentScenarioId === 'fit_call') {
    notesContext = 'fit_call';
  }

  if (currentScenarioId === 'sales_demo') {
    notesContext = 'demo';
  }

  return (
    <div className="flex-col h-full pb-20">
      <div className="mb-4 flex gap-2" style={{ alignItems: 'center' }}>
        <span style={{ 
          fontSize: '12px', 
          fontWeight: 600, 
          padding: '4px 8px', 
          borderRadius: '4px',
          backgroundColor: accentColor,
          color: 'var(--color-deep-charcoal)'
        }}>
          {node.stage}
        </span>
      </div>

      <div className="mb-4">
        <span className="label-text">Goal: {node.goal}</span>
      </div>

      <div className="card mb-6" style={{ minHeight: '200px', borderLeft: `4px solid ${accentColor}` }}>
        {node.useWhen && (
          <p style={{ fontSize: '14px', color: 'var(--color-muted-sage)', marginBottom: '12px', fontStyle: 'italic' }}>
            Use when: {node.useWhen}
          </p>
        )}
        <p className="script-text" style={{ whiteSpace: 'pre-wrap', fontWeight: 500 }}>
          {node.sayThis}
        </p>
      </div>

      <div className="flex-col gap-4 mt-auto">
        <h3 className="label-text">What happened? / Next Step</h3>
        <div className="flex-col gap-3">
          {node.branchButtons.map((btn) => (
            <button 
              key={btn.id} 
              className="btn btn-secondary" 
              onClick={() => handleAction(btn.target)}
              style={{ justifyContent: 'flex-start', padding: '12px 24px', fontSize: '16px' }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div style={{
        position: 'sticky',
        bottom: '0',
        backgroundColor: '#fff',
        padding: '12px 0',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-between',
        zIndex: 10,
        marginTop: '24px'
      }}>
        {onOpenNotes && (
          <button className="btn" onClick={() => onOpenNotes(notesContext)} style={{ flex: 1, padding: '8px', fontSize: '14px', backgroundColor: 'transparent', color: 'var(--color-deep-charcoal)', border: '1px solid var(--color-border)' }}>
            Quick Notes
          </button>
        )}
        <button className="btn" onClick={onGoToLibrary} style={{ flex: 1, padding: '8px', fontSize: '14px', backgroundColor: 'transparent', color: 'var(--color-deep-charcoal)', border: '1px solid var(--color-border)' }}>
          Full Framework
        </button>
      </div>
    </div>
  );
};

export default LiveView;
