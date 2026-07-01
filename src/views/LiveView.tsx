import React, { useState, useEffect } from 'react';
import { livePaths } from '../data/livePaths';

interface LiveViewProps {
  workspace: 'medspa' | 'partner';
  scenario: string | null;
  onReset: () => void;
  onGoToLibrary: () => void;
}

const LiveView: React.FC<LiveViewProps> = ({ workspace, scenario, onReset, onGoToLibrary }) => {
  const [currentScenarioId, setCurrentScenarioId] = useState<string | null>(scenario);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  
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

      {/* Quick Actions Sticky Bar Placeholder */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        left: '0',
        right: '0',
        padding: '12px 16px',
        backgroundColor: 'var(--color-warm-ivory)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <button className="btn" onClick={() => setIsNoteDrawerOpen(true)} style={{ flex: 1, padding: '8px', fontSize: '14px', backgroundColor: 'transparent', color: 'var(--color-deep-charcoal)', border: '1px solid var(--color-border)' }}>
          Quick Notes
        </button>
        <button className="btn" onClick={onGoToLibrary} style={{ flex: 1, padding: '8px', fontSize: '14px', backgroundColor: 'transparent', color: 'var(--color-deep-charcoal)', border: '1px solid var(--color-border)' }}>
          Full Framework
        </button>
      </div>

      {/* Note Drawer Overlay */}
      {isNoteDrawerOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: '80px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            backgroundColor: 'var(--color-warm-ivory)',
            padding: '24px 16px',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.1)'
          }}>
            <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Quick Notes (Placeholder)</h3>
              <button onClick={() => setIsNoteDrawerOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
            </div>
            
            <div className="flex-col gap-4" style={{ overflowY: 'auto', paddingBottom: '20px' }}>
              <div>
                <label className="label-text">Situation/Outcome</label>
                <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#fff' }}>
                  <option>Got VM</option>
                  <option>Transferred to Owner</option>
                  <option>Gatekeeper Blocked</option>
                  <option>Booked Fit Call</option>
                </select>
              </div>
              
              <div>
                <label className="label-text">Contact Name</label>
                <input type="text" placeholder="Name" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#fff' }} />
              </div>

              <div>
                <label className="label-text">Direct Email / Number</label>
                <input type="text" placeholder="Email or Phone" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#fff' }} />
              </div>

              <div>
                <label className="label-text">Freeform Notes</label>
                <textarea rows={4} placeholder="Type notes here..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#fff', resize: 'none' }}></textarea>
              </div>

              <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => setIsNoteDrawerOpen(false)}>
                Save Note (Demo)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveView;
