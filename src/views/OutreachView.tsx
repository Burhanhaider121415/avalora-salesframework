import React, { useState } from 'react';
import { outreachPaths, type ActionTarget } from '../data/outreachPaths';
import type { NoteContext } from '../types/app';

interface OutreachViewProps {
  modeId: string; // 'email_mode' | 'ig_mode'
  onClose: () => void;
  onOpenNotes?: (context: NoteContext) => void;
}

const OutreachView: React.FC<OutreachViewProps> = ({ modeId, onClose, onOpenNotes }) => {
  const path = outreachPaths[modeId];
  const [currentNodeId, setCurrentNodeId] = useState<string>(path.initialNode);
  const [history, setHistory] = useState<string[]>([]);
  
  const currentNode = path.nodes[currentNodeId];

  const handleAction = (target: ActionTarget) => {
    if (target === 'done') {
      onClose();
      return;
    }
    if (target === 'back') {
      const prev = history.pop();
      if (prev) {
        setHistory([...history]);
        setCurrentNodeId(prev);
      }
      return;
    }
    
    // Normal forward navigation
    setHistory([...history, currentNodeId]);
    setCurrentNodeId(target);
  };

  if (!currentNode) return null;

  return (
    <div className="flex-col" style={{ padding: '24px 16px', gap: '24px', paddingBottom: '100px' }}>
      
      {/* Header */}
      <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-grey)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {path.name}
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginTop: '4px' }}>
            {currentNode.stage}
          </h2>
        </div>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', fontSize: '24px', color: 'var(--color-slate-grey)', cursor: 'pointer' }}
        >
          &times;
        </button>
      </div>

      {/* Goal Card */}
      <div style={{ backgroundColor: '#fff', borderLeft: '4px solid var(--color-accent-amber)', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 className="label-text" style={{ marginBottom: '4px' }}>Goal</h3>
        <p className="body-text" style={{ fontWeight: 500 }}>{currentNode.goal}</p>
      </div>

      {/* Fields (e.g. Research Card) */}
      {currentNode.fields && (
        <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 className="label-text">Research Data</h3>
          {currentNode.fields.map((f, i) => (
            <div key={i}>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-slate-grey)', marginBottom: '4px' }}>{f.label}</label>
              <input type="text" placeholder={f.placeholder} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
            </div>
          ))}
        </div>
      )}

      {/* Checklist */}
      {currentNode.checklist && (
        <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <h3 className="label-text" style={{ marginBottom: '12px' }}>Checklist</h3>
          <div className="flex-col gap-2">
            {currentNode.checklist.map((item, i) => (
              <label key={i} className="flex gap-2" style={{ alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginTop: '4px' }} />
                <span className="body-text">{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Instruction */}
      {currentNode.instruction && (
        <p className="body-text" style={{ color: 'var(--color-deep-charcoal)', backgroundColor: 'var(--color-warm-ivory)', padding: '16px', borderRadius: '8px' }}>
          {currentNode.instruction}
        </p>
      )}

      {/* Branches/Actions */}
      <div className="flex-col gap-2" style={{ marginTop: '16px' }}>
        {currentNode.branchButtons.map(btn => {
          const isBack = btn.target === 'back';
          const isDone = btn.target === 'done';
          let btnClass = 'btn-secondary';
          if (!isBack && !isDone && btn.target !== 'next') {
            btnClass = 'btn-secondary'; // branching options
          }
          if (btn.target === 'next' || isDone) btnClass = 'btn-primary';

          return (
            <button 
              key={btn.id}
              className={`btn ${btnClass}`}
              onClick={() => handleAction(btn.target)}
              style={isBack ? { backgroundColor: 'transparent', border: '1px solid var(--color-border)' } : {}}
            >
              {btn.label}
            </button>
          );
        })}
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
        justifyContent: 'center',
        zIndex: 10,
        marginTop: '24px'
      }}>
        {onOpenNotes && (
          <button className="btn" onClick={() => onOpenNotes(modeId === 'ig_mode' ? 'ig' : 'email')} style={{ flex: 1, padding: '8px', fontSize: '14px', backgroundColor: 'transparent', color: 'var(--color-deep-charcoal)', border: '1px solid var(--color-border)' }}>
            Quick Notes
          </button>
        )}
      </div>

    </div>
  );
};

export default OutreachView;
