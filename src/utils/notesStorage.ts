import type { NoteContext, Workspace } from '../types/app';

export type StoredNotes = Partial<Record<Workspace, Partial<Record<NoteContext, Record<string, string>>>>>;

export const NOTES_STORAGE_KEY = 'avalora-sales-desk:notes:v1';

function parseStoredNotes(raw: string | null): StoredNotes {
  if (!raw) {
    return {};
  }

  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Malformed note storage');
  }

  return parsed as StoredNotes;
}

export function loadNotesDraft(
  storage: Pick<Storage, 'getItem'>,
  workspace: Workspace,
  context: NoteContext
): Record<string, string> {
  const notes = parseStoredNotes(storage.getItem(NOTES_STORAGE_KEY));
  const workspaceNotes = notes[workspace];
  if (!workspaceNotes || typeof workspaceNotes !== 'object') {
    return {};
  }

  const contextNotes = workspaceNotes[context];
  if (!contextNotes || typeof contextNotes !== 'object') {
    return {};
  }

  return contextNotes;
}

export function saveNotesDraft(
  storage: Pick<Storage, 'getItem' | 'setItem'>,
  workspace: Workspace,
  context: NoteContext,
  formData: Record<string, string>
): void {
  const notes = parseStoredNotes(storage.getItem(NOTES_STORAGE_KEY));
  const workspaceNotes = notes[workspace] && typeof notes[workspace] === 'object' ? notes[workspace] : {};
  const nextNotes: StoredNotes = {
    ...notes,
    [workspace]: {
      ...workspaceNotes,
      [context]: formData,
    },
  };

  storage.setItem(NOTES_STORAGE_KEY, JSON.stringify(nextNotes));
}
