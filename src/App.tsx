import { useEffect, useMemo, useState } from 'react';
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
import { livePaths } from './data/livePaths';
import { outreachPaths } from './data/outreachPaths';
import type { AppMode, NoteContext, Workspace } from './types/app';
import { buildRouteUrl, parseRouteState } from './utils/appRouting';
import './index.css';
import { SidebarNav } from './components/SidebarNav';

function getLiveScenarioNotesContext(scenario: string | null, workspace: Workspace): NoteContext {
  if (workspace === 'partner') {
    return 'partner';
  }

  if (scenario === 'fit_call') {
    return 'fit_call';
  }

  if (scenario === 'sales_demo') {
    return 'demo';
  }

  if (scenario === 'medspa_owner') {
    return 'owner';
  }

  return 'gatekeeper';
}

function getOutreachNotesContext(modeId: string | null): NoteContext {
  if (modeId === 'ig_mode') {
    return 'ig';
  }

  return 'email';
}

function App() {
  const initialRoute = useMemo(() => parseRouteState(window.location), []);
  const [currentMode, setCurrentMode] = useState<AppMode>(initialRoute.currentMode);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(initialRoute.workspace);
  const [activeLiveScenario, setActiveLiveScenario] = useState<string | null>(initialRoute.liveScenario);
  const [activeOutreachMode, setActiveOutreachMode] = useState<string | null>(initialRoute.outreachMode);
  const [activeNotesContext, setActiveNotesContext] = useState<NoteContext>(initialRoute.notesContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handlePopState = () => {
      const routeState = parseRouteState(window.location);
      setCurrentMode(routeState.currentMode);
      setActiveWorkspace(routeState.workspace);
      setActiveLiveScenario(routeState.liveScenario);
      setActiveOutreachMode(routeState.outreachMode);
      setActiveNotesContext(routeState.notesContext);
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const nextUrl = buildRouteUrl({
      currentMode,
      workspace: activeWorkspace,
      liveScenario: activeLiveScenario,
      outreachMode: activeOutreachMode,
      notesContext: activeNotesContext,
    });

    if (`${window.location.pathname}${window.location.search}` !== nextUrl) {
      window.history.pushState({}, '', nextUrl);
    }
  }, [activeLiveScenario, activeNotesContext, activeOutreachMode, activeWorkspace, currentMode]);

  const handleLiveModeSelect = (scenario: string | null) => {
    if (scenario && livePaths[scenario]) {
      setActiveWorkspace(livePaths[scenario].workspace);
    }

    setActiveLiveScenario(scenario);
    setActiveNotesContext(getLiveScenarioNotesContext(scenario, scenario && livePaths[scenario] ? livePaths[scenario].workspace : activeWorkspace));
    setCurrentMode('live');
  };

  const handleOutreachModeSelect = (modeId: string) => {
    if (outreachPaths[modeId]) {
      setActiveWorkspace(outreachPaths[modeId].workspace);
    }

    setActiveOutreachMode(modeId);
    setActiveNotesContext(getOutreachNotesContext(modeId));
    setCurrentMode('outreach');
  };

  const openNotes = (context: NoteContext) => {
    const nextWorkspace = context === 'partner' ? 'partner' : activeWorkspace;
    setActiveWorkspace(nextWorkspace);
    setActiveNotesContext(context);
    setCurrentMode('notes');
  };

  const openLibrary = (workspace?: Workspace) => {
    if (workspace) {
      setActiveWorkspace(workspace);
    }

    setCurrentMode('library');
  };

  const renderContent = () => {
    switch (currentMode) {
      case 'start':
        return <StartView 
                 workspace={activeWorkspace}
                 onLiveModeSelect={handleLiveModeSelect} 
                 onOutreachModeSelect={handleOutreachModeSelect}
                 onOpenSafety={() => setCurrentMode('safety')} 
                 onOpenCadence={() => openLibrary('medspa')}
                 onOpenNotes={() => openNotes('general')}
                 onOpenLibrary={openLibrary}
               />;
      case 'live':
        return (
          <LiveView
            workspace={activeWorkspace}
            scenario={activeLiveScenario}
            onReset={() => setCurrentMode('start')}
            onGoToLibrary={() => openLibrary(activeWorkspace)}
            onOpenNotes={(context) => openNotes(context)}
          />
        );
      case 'outreach':
        if (!activeOutreachMode) return null;
        return (
          <OutreachView
            modeId={activeOutreachMode}
            onClose={() => setCurrentMode('start')}
            onOpenNotes={(context) => openNotes(context)}
          />
        );
      case 'library':
        return <LibraryView workspace={activeWorkspace} />;
      case 'search':
        return <SearchView 
                 workspace={activeWorkspace}
                 onGoToLiveMode={handleLiveModeSelect} 
                 onGoToLibrary={openLibrary}
                 onGoToOutreachMode={handleOutreachModeSelect}
                 onOpenNotes={openNotes}
               />;
      case 'cadence':
        return <CadenceView 
                 onGoToLiveMode={handleLiveModeSelect}
                 onGoToEmailMode={() => handleOutreachModeSelect('email_mode')}
                 onGoToInstagramMode={() => handleOutreachModeSelect('ig_mode')}
                 onOpenNotes={openNotes}
               />;
      case 'notes':
        return <NotesView initialContext={activeNotesContext as any} workspace={activeWorkspace} />;
      case 'safety':
        return <PositioningSafetyView />;
      case 'notFound':
        return (
          <div className="flex-col gap-4 pb-6">
            <div className="card">
              <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Page not found</h2>
              <p style={{ color: 'var(--color-muted-sage)', marginBottom: '16px' }}>
                Page not found. Return to Start.
              </p>
              <button className="btn btn-primary" onClick={() => setCurrentMode('start')}>
                Return to Start
              </button>
            </div>
          </div>
        );
      default:
        return <StartView 
                 workspace={activeWorkspace}
                 onLiveModeSelect={handleLiveModeSelect} 
                 onOutreachModeSelect={handleOutreachModeSelect}
                 onOpenSafety={() => setCurrentMode('safety')} 
                 onOpenCadence={() => openLibrary('medspa')}
                 onOpenNotes={() => openNotes('general')}
                 onOpenLibrary={openLibrary}
               />;
    }
  };

  return (
    <div className="desktop-layout">
      {sidebarOpen && <SidebarNav currentMode={currentMode as Mode} setMode={(m) => setCurrentMode(m)} />}
      
      <div className="app-container main-content-wrapper">
        <TopBar 
          currentMode={currentMode === 'outreach' || currentMode === 'safety' || currentMode === 'cadence' || currentMode === 'notFound' ? 'start' : currentMode} 
          workspace={activeWorkspace} 
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
          onWorkspaceToggle={() => {
            const nextWorkspace = activeWorkspace === 'medspa' ? 'partner' : 'medspa';
            setActiveWorkspace(nextWorkspace);
            if (currentMode === 'notes') {
              setActiveNotesContext(nextWorkspace === 'partner' ? 'partner' : 'gatekeeper');
            }
          }}
          onReset={() => setCurrentMode('start')}
        />
        <div className="content-area">
          {renderContent()}
        </div>
        {(currentMode !== 'safety' && currentMode !== 'outreach' && currentMode !== 'notFound') && (
          <BottomNav currentMode={currentMode as Mode} setMode={(m) => setCurrentMode(m)} />
        )}
      </div>

    </div>
  );
}

export default App;
