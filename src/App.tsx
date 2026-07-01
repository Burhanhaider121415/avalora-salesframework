import { useState } from 'react';
import { BottomNav, type Mode } from './components/BottomNav';
import { TopBar } from './components/TopBar';
import StartView from './views/StartView';
import LiveView from './views/LiveView';
import LibraryView from './views/LibraryView';
import SearchView from './views/SearchView';
import NotesView from './views/NotesView';
import PositioningSafetyView from './views/PositioningSafetyView';
import OutreachView from './views/OutreachView';
import CadenceView from './views/CadenceView';
import './index.css';

function App() {
  const [currentMode, setCurrentMode] = useState<Mode | 'safety' | 'outreach' | 'cadence'>('start');
  const [activeWorkspace, setActiveWorkspace] = useState<'medspa' | 'partner'>('medspa');
  const [activeLiveScenario, setActiveLiveScenario] = useState<string | null>(null);
  const [activeOutreachMode, setActiveOutreachMode] = useState<string | null>(null);

  const handleLiveModeSelect = (scenario: string | null) => {
    setActiveLiveScenario(scenario);
    setCurrentMode('live');
  };

  const handleOutreachModeSelect = (modeId: string) => {
    setActiveOutreachMode(modeId);
    setCurrentMode('outreach');
  };

  const renderContent = () => {
    switch (currentMode) {
      case 'start':
        return <StartView 
                 workspace={activeWorkspace}
                 onLiveModeSelect={handleLiveModeSelect} 
                 onOutreachModeSelect={handleOutreachModeSelect}
                 onOpenSafety={() => setCurrentMode('safety')} 
                 onOpenCadence={() => setCurrentMode('cadence')}
               />;
      case 'live':
        return <LiveView workspace={activeWorkspace} scenario={activeLiveScenario} onReset={() => setCurrentMode('start')} onGoToLibrary={() => setCurrentMode('library')} onOpenNotes={() => setCurrentMode('notes')} />;
      case 'outreach':
        if (!activeOutreachMode) return null;
        return <OutreachView modeId={activeOutreachMode} onClose={() => setCurrentMode('start')} onOpenNotes={() => setCurrentMode('notes')} />;
      case 'library':
        return <LibraryView workspace={activeWorkspace} />;
      case 'search':
        return <SearchView 
                 onGoToLiveMode={handleLiveModeSelect} 
                 onGoToLibrary={() => setCurrentMode('library')}
                 onOpenNotes={() => setCurrentMode('notes')}
               />;
      case 'cadence':
        return <CadenceView 
                 onGoToLiveMode={handleLiveModeSelect}
                 onGoToEmailMode={() => handleOutreachModeSelect('email_mode')}
                 onGoToInstagramMode={() => handleOutreachModeSelect('ig_mode')}
                 onOpenNotes={() => setCurrentMode('notes')}
               />;
      case 'notes':
        return <NotesView workspace={activeWorkspace} />;
      case 'safety':
        return <PositioningSafetyView />;
      default:
        return <StartView 
                 workspace={activeWorkspace}
                 onLiveModeSelect={handleLiveModeSelect} 
                 onOutreachModeSelect={handleOutreachModeSelect}
                 onOpenSafety={() => setCurrentMode('safety')} 
                 onOpenCadence={() => setCurrentMode('cadence')}
               />;
    }
  };

  return (
    <div className="app-container">
      <TopBar 
        currentMode={currentMode === 'outreach' || currentMode === 'safety' || currentMode === 'cadence' ? 'start' : currentMode} 
        workspace={activeWorkspace} 
        onWorkspaceToggle={() => setActiveWorkspace(prev => prev === 'medspa' ? 'partner' : 'medspa')}
        onReset={() => setCurrentMode('start')}
      />
      <div className="content-area">
        {renderContent()}
      </div>
      {(currentMode !== 'safety' && currentMode !== 'outreach') && (
        <BottomNav currentMode={currentMode as Mode} setMode={(m) => setCurrentMode(m)} />
      )}
    </div>
  );
}

export default App;
