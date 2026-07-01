import React from 'react';
import type { Mode } from './BottomNav';

interface SidebarNavProps {
  currentMode: Mode;
  setMode: (mode: Mode) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ currentMode, setMode }) => {
  return (
    <div className="sidebar-nav">
      <div style={{ padding: '0 8px 24px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-deep-charcoal)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'var(--color-white)', fontWeight: 'bold' }}>A</span>
        </div>
        <h2 style={{ fontSize: '18px', color: 'var(--color-deep-charcoal)', margin: 0 }}>Avalora Desk</h2>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button 
          className={`sidebar-item ${currentMode === 'start' ? 'active' : ''}`} 
          onClick={() => setMode('start')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span className="sidebar-label">Start</span>
        </button>
        
        <button 
          className={`sidebar-item ${currentMode === 'live' ? 'active' : ''}`} 
          onClick={() => setMode('live')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/></svg>
          <span className="sidebar-label">Live</span>
        </button>
        
        <button 
          className={`sidebar-item ${currentMode === 'library' ? 'active' : ''}`} 
          onClick={() => setMode('library')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
          <span className="sidebar-label">Library</span>
        </button>

        <button 
          className={`sidebar-item ${currentMode === 'search' ? 'active' : ''}`} 
          onClick={() => setMode('search')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span className="sidebar-label">Search</span>
        </button>

        <button 
          className={`sidebar-item ${currentMode === 'notes' ? 'active' : ''}`} 
          onClick={() => setMode('notes')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/></svg>
          <span className="sidebar-label">Notes</span>
        </button>
      </div>
    </div>
  );
};
