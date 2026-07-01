import React from 'react';
import { Home, Play, BookOpen, Search, Edit3 } from 'lucide-react';

export type Mode = 'start' | 'live' | 'library' | 'search' | 'notes';

interface BottomNavProps {
  currentMode: Mode;
  setMode: (mode: Mode) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentMode, setMode }) => {
  const navItems = [
    { id: 'start', label: 'Start', icon: Home },
    { id: 'live', label: 'Live', icon: Play },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'notes', label: 'Notes', icon: Edit3 },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentMode === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMode(item.id as Mode)}
          >
            <Icon strokeWidth={isActive ? 2.5 : 2} />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
