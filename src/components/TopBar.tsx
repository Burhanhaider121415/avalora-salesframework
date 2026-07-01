import React from 'react';
import type { Mode } from './BottomNav';

interface TopBarProps {
  currentMode: Mode | 'safety';
  workspace: 'medspa' | 'partner';
  onWorkspaceToggle: () => void;
  onReset: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentMode, workspace, onWorkspaceToggle, onReset }) => {
  const getModeTitle = () => {
    switch (currentMode) {
      case 'start': return 'Avalora Sales Desk';
      case 'live': return 'Live Execution';
      case 'library': return 'Framework Library';
      case 'search': return 'Objection Search';
      case 'notes': return 'Quick Notes';
      case 'safety': return 'Positioning & Safety';
      default: return 'Avalora';
    }
  };

  const isMedSpa = workspace === 'medspa';
  
  return (
    <div className="top-bar">
      <div className="flex items-center gap-4">
        {currentMode !== 'start' && (
          <button onClick={onReset} className="label-text" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
            ← Back
          </button>
        )}
        <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{getModeTitle()}</h3>
      </div>
      
      {currentMode !== 'safety' && (
        <button 
          onClick={onWorkspaceToggle}
          style={{
            backgroundColor: isMedSpa ? 'var(--color-soft-amber)' : 'var(--color-muted-sage)',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {isMedSpa ? 'Med Spa Owner' : 'Referral Partner'}
        </button>
      )}
    </div>
  );
};
