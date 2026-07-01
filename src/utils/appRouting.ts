import type { AppMode, NoteContext, Workspace } from '../types/app';

export interface RouteState {
  currentMode: AppMode;
  workspace: Workspace;
  liveScenario: string | null;
  outreachMode: string | null;
  notesContext: NoteContext;
}

const DEFAULT_STATE: RouteState = {
  currentMode: 'start',
  workspace: 'medspa',
  liveScenario: null,
  outreachMode: null,
  notesContext: 'gatekeeper',
};

const NOTE_CONTEXTS: NoteContext[] = ['gatekeeper', 'owner', 'fit_call', 'demo', 'email', 'ig', 'partner'];
const WORKSPACES: Workspace[] = ['medspa', 'partner'];

function getWorkspace(value: string | null): Workspace {
  if (value && WORKSPACES.includes(value as Workspace)) {
    return value as Workspace;
  }

  return DEFAULT_STATE.workspace;
}

function getNoteContext(value: string | null, workspace: Workspace): NoteContext {
  if (value && NOTE_CONTEXTS.includes(value as NoteContext)) {
    return value as NoteContext;
  }

  return workspace === 'partner' ? 'partner' : DEFAULT_STATE.notesContext;
}

export function parseRouteState(location: Location): RouteState {
  const params = new URLSearchParams(location.search);
  const workspace = getWorkspace(params.get('workspace'));
  const pathname = location.pathname.replace(/\/+$/, '') || '/';
  const liveScenario = params.get('scenario');
  const outreachMode = params.get('mode');
  const notesContext = getNoteContext(params.get('context'), workspace);

  switch (pathname) {
    case '/':
      return { ...DEFAULT_STATE, workspace, notesContext };
    case '/live':
      return { ...DEFAULT_STATE, currentMode: 'live', workspace, liveScenario, notesContext };
    case '/library':
      return { ...DEFAULT_STATE, currentMode: 'library', workspace, notesContext };
    case '/search':
      return { ...DEFAULT_STATE, currentMode: 'search', workspace, notesContext };
    case '/notes':
      return { ...DEFAULT_STATE, currentMode: 'notes', workspace, notesContext };
    case '/safety':
      return { ...DEFAULT_STATE, currentMode: 'safety', workspace, notesContext };
    case '/outreach':
      return { ...DEFAULT_STATE, currentMode: 'outreach', workspace, outreachMode, notesContext };
    case '/cadence':
      return { ...DEFAULT_STATE, currentMode: 'cadence', workspace, notesContext };
    default:
      return { ...DEFAULT_STATE, currentMode: 'notFound', workspace, notesContext };
  }
}

export function buildRouteUrl(state: RouteState): string {
  const params = new URLSearchParams();
  const normalizedNotesContext =
    state.workspace === 'partner' ? 'partner' : state.notesContext;

  if (state.workspace !== DEFAULT_STATE.workspace) {
    params.set('workspace', state.workspace);
  }

  if (state.currentMode === 'live' && state.liveScenario) {
    params.set('scenario', state.liveScenario);
  }

  if (state.currentMode === 'outreach' && state.outreachMode) {
    params.set('mode', state.outreachMode);
  }

  if (state.currentMode === 'notes' || normalizedNotesContext !== DEFAULT_STATE.notesContext) {
    params.set('context', normalizedNotesContext);
  }

  let pathname = '/';

  if (state.currentMode === 'live') pathname = '/live';
  if (state.currentMode === 'library') pathname = '/library';
  if (state.currentMode === 'search') pathname = '/search';
  if (state.currentMode === 'notes') pathname = '/notes';
  if (state.currentMode === 'safety') pathname = '/safety';
  if (state.currentMode === 'outreach') pathname = '/outreach';
  if (state.currentMode === 'cadence') pathname = '/cadence';
  if (state.currentMode === 'notFound') pathname = '/not-found';

  const search = params.toString();

  return search ? `${pathname}?${search}` : pathname;
}
