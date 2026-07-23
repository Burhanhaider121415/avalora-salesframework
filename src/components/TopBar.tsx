import React from 'react';
import type { Mode } from './BottomNav';

interface TopBarProps {
  currentMode: Mode | 'safety';
  onReset: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentMode, onReset, sidebarOpen, onToggleSidebar }) => {
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

  return (
    <div className="top-bar">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="sidebar-toggle" aria-label={sidebarOpen ? 'Hide navigation menu' : 'Show navigation menu'}>
          {sidebarOpen ? 'Hide menu' : 'Show menu'}
        </button>
        {currentMode !== 'start' && (
          <button onClick={onReset} className="label-text" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
            ← Back
          </button>
        )}
        <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{getModeTitle()}</h3>
      </div>
    </div>
  );
};
