import React, { useState } from 'react';
import { BottomNav, Mode } from './components/BottomNav';
import { TopBar } from './components/TopBar';
import StartView from './views/StartView';
import LiveView from './views/LiveView';
import LibraryView from './views/LibraryView';
import SearchView from './views/SearchView';
import NotesView from './views/NotesView';
import PositioningSafetyView from './views/PositioningSafetyView';
import './index.css';

function App() {
  const [currentMode, setCurrentMode] = useState<Mode | 'safety'>('start');
  const [activeWorkspace, setActiveWorkspace] = useState<'medspa' | 'partner'>('medspa');
  const [activeLiveScenario, setActiveLiveScenario] = useState<string | null>(null);

  const handleStartMode = (scenarioId: string | null, workspaceId: 'medspa' | 'partner') => {
    setActiveWorkspace(workspaceId);
    setActiveLiveScenario(scenarioId);
    setCurrentMode('live');
  };

  const renderContent = () => {
    switch (currentMode) {
      case 'start':
        return <StartView onSelectMode={handleStartMode} onOpenSafety={() => setCurrentMode('safety')} />;
      case 'live':
        return <LiveView workspace={activeWorkspace} scenario={activeLiveScenario} onReset={() => setCurrentMode('start')} />;
      case 'library':
        return <LibraryView />;
      case 'search':
        return <SearchView />;
      case 'notes':
        return <NotesView workspace={activeWorkspace} />;
      case 'safety':
        return <PositioningSafetyView onBack={() => setCurrentMode('start')} />;
      default:
        return <StartView onSelectMode={handleStartMode} onOpenSafety={() => setCurrentMode('safety')} />;
    }
  };

  return (
    <div className="app-container">
      <TopBar 
        currentMode={currentMode} 
        workspace={activeWorkspace} 
        onWorkspaceToggle={() => setActiveWorkspace(prev => prev === 'medspa' ? 'partner' : 'medspa')}
        onReset={() => setCurrentMode('start')}
      />
      <div className="content-area">
        {renderContent()}
      </div>
      {(currentMode !== 'safety') && (
        <BottomNav currentMode={currentMode as Mode} setMode={(m) => setCurrentMode(m)} />
      )}
    </div>
  );
}

export default App;
