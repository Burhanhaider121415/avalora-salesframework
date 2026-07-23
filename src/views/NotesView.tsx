import React, { useEffect, useState } from 'react';
import type { NoteContext } from '../types/app';

interface NotesViewProps {
  initialContext?: NoteContext;
  isSidePanel?: boolean;
}

type NoteCategory = 'Gatekeeper' | 'Owner Call' | 'Fit Call' | 'Sales/Demo' | 'Email' | 'Instagram' | 'Referral Partner' | 'General';

interface SavedNote {
  id: string;
  category: NoteCategory;
  title: string;
  body: string;
  createdAt: string;
}

const STORAGE_KEY = 'avalora-notes-v2';

const CATEGORIES: NoteCategory[] = [
  'Gatekeeper', 'Owner Call', 'Fit Call', 'Sales/Demo',
  'Email', 'Instagram', 'Referral Partner', 'General'
];

function contextToCategory(ctx: NoteContext): NoteCategory {
  switch (ctx) {
    case 'gatekeeper': return 'Gatekeeper';
    case 'owner': return 'Owner Call';
    case 'fit_call': return 'Fit Call';
    case 'demo': return 'Sales/Demo';
    case 'email': return 'Email';
    case 'ig': return 'Instagram';
    case 'partner': return 'Referral Partner';
    case 'general': return 'General';
    default: return 'General';
  }
}

function loadNotes(): SavedNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistNotes(notes: SavedNote[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // localStorage full or unavailable
  }
}

const NotesView: React.FC<NotesViewProps> = ({ initialContext = 'general', isSidePanel = false }) => {
  const [category, setCategory] = useState<NoteCategory>(contextToCategory(initialContext));
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  // Load notes on mount
  useEffect(() => {
    setSavedNotes(loadNotes());
  }, []);

  // Sync context from parent
  useEffect(() => {
    setCategory(contextToCategory(initialContext));
  }, [initialContext]);

  const displayedNotes = savedNotes;

  const handleSave = () => {
    if (!noteBody.trim()) return;

    const noteNumber = savedNotes.length + 1;
    const title = noteTitle.trim() || `Note ${noteNumber}`;

    if (editingId) {
      const updated = savedNotes.map(n =>
        n.id === editingId ? { ...n, category, title, body: noteBody } : n
      );
      setSavedNotes(updated);
      persistNotes(updated);
      setEditingId(null);
    } else {
      const newNote: SavedNote = {
        id: Date.now().toString(),
        category,
        title,
        body: noteBody,
        createdAt: new Date().toLocaleString(),
      };
      const updated = [newNote, ...savedNotes];
      setSavedNotes(updated);
      persistNotes(updated);
    }

    setNoteTitle('');
    setNoteBody('');
    setSaveStatus('Saved locally on this device.');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleEdit = (note: SavedNote) => {
    setCategory(note.category);
    setNoteTitle(note.title);
    setNoteBody(note.body);
    setEditingId(note.id);
  };

  const handleDelete = (id: string) => {
    const updated = savedNotes.filter(n => n.id !== id);
    setSavedNotes(updated);
    persistNotes(updated);
    if (editingId === id) {
      setEditingId(null);
      setNoteTitle('');
      setNoteBody('');
    }
  };

  const handleCopyNote = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('Copied!');
    } catch {
      setCopyStatus('Copy failed');
    }
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const handleCopyFormattedNote = async (note: Pick<SavedNote, 'category' | 'title' | 'body'>) => {
    await handleCopyNote(`${note.category}\n${note.title}\n\n${note.body}`);
  };

  const handleClear = () => {
    setNoteTitle('');
    setNoteBody('');
    setEditingId(null);
  };

  // ─── Side Panel (compact) ───
  if (isSidePanel) {
    return (
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-deep-charcoal)', margin: 0 }}>
          Quick Notes
        </h3>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as NoteCategory)}
          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-light-gray)', fontSize: '13px', fontFamily: 'inherit' }}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <textarea
          value={noteBody}
          onChange={(e) => setNoteBody(e.target.value)}
          placeholder="Type your note here..."
          style={{
            width: '100%', minHeight: '100px', padding: '10px', borderRadius: '8px',
            border: '1px solid var(--color-light-gray)', fontSize: '14px', fontFamily: 'inherit',
            resize: 'vertical', lineHeight: 1.5
          }}
        />

        <button
          onClick={handleSave}
          disabled={!noteBody.trim()}
          style={{
            width: '100%', padding: '10px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
            backgroundColor: noteBody.trim() ? 'var(--color-deep-charcoal)' : '#ccc',
            color: '#fff', border: 'none', cursor: noteBody.trim() ? 'pointer' : 'default',
            fontFamily: 'inherit'
          }}
        >
          Save Note
        </button>
        {saveStatus && <p style={{ fontSize: '12px', color: 'var(--color-muted-sage)', margin: 0 }}>{saveStatus}</p>}

        {/* Latest saved notes */}
        {displayedNotes.slice(0, 5).map(note => (
          <div key={note.id} className="note-card" style={{ padding: '10px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '4px' }}>
              {note.title}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-muted-sage)', marginBottom: '4px' }}>
              {note.category} · {note.createdAt}
            </div>
            <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.4, overflow: 'hidden', maxHeight: '40px' }}>
              {note.body}
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
              <button onClick={() => void handleCopyNote(note.body)} style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Copy</button>
              <button onClick={() => void handleCopyFormattedNote(note)} style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Copy Formatted</button>
              <button onClick={() => handleDelete(note.id)} className="note-delete-btn" style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', border: '1px solid #f5c6cb', color: '#a94442', background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ─── Full Page View ───
  return (
    <div className="notes-scratchpad" style={{ padding: '24px 16px', paddingBottom: '100px' }}>
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-deep-charcoal)', marginBottom: '6px' }}>
          Quick Notes
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--color-muted-sage)', lineHeight: 1.5 }}>
          Simple scratchpad. Saved locally on this device. Copy to paste into your external sheet.
        </p>
      </div>

      {/* Category selector */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: category === c ? 600 : 400,
              whiteSpace: 'nowrap', border: category === c ? '2px solid var(--color-deep-charcoal)' : '1px solid var(--color-light-gray)',
              backgroundColor: category === c ? 'var(--color-deep-charcoal)' : '#fff',
              color: category === c ? '#fff' : 'var(--color-deep-charcoal)',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease'
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Note form */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '14px', border: '1px solid var(--color-light-gray)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px', color: 'var(--color-deep-charcoal)' }}>
                Note Title <span style={{ fontWeight: 400, color: 'var(--color-muted-sage)' }}>(optional)</span>
              </label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="e.g. Call with Dr. Smith"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: '8px',
                  border: '1px solid var(--color-light-gray)', fontSize: '15px', fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px', color: 'var(--color-deep-charcoal)' }}>
                Note
              </label>
              <textarea
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                placeholder="Type your note here..."
                style={{
                  width: '100%', minHeight: '180px', padding: '14px', borderRadius: '8px',
                  border: '1px solid var(--color-light-gray)', fontSize: '16px', fontFamily: 'inherit',
                  resize: 'vertical', lineHeight: 1.6
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSave}
                disabled={!noteBody.trim()}
                style={{
                  flex: 1, padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: 600,
                  backgroundColor: noteBody.trim() ? 'var(--color-deep-charcoal)' : '#ccc',
                  color: '#fff', border: 'none', cursor: noteBody.trim() ? 'pointer' : 'default',
                  fontFamily: 'inherit'
                }}
              >
                {editingId ? 'Update Note' : 'Save Note'}
              </button>
              <button
                onClick={() => void handleCopyNote(noteBody)}
                disabled={!noteBody.trim()}
                style={{
                  padding: '14px 20px', borderRadius: '8px', fontSize: '15px',
                  backgroundColor: '#fff', color: 'var(--color-deep-charcoal)',
                  border: '1px solid var(--color-light-gray)', cursor: noteBody.trim() ? 'pointer' : 'default',
                  fontFamily: 'inherit'
                }}
              >
                {copyStatus || 'Copy Note'}
              </button>
              <button
                onClick={() => void handleCopyFormattedNote({ category, title: noteTitle.trim() || 'Untitled note', body: noteBody })}
                disabled={!noteBody.trim()}
                style={{
                  padding: '14px 20px', borderRadius: '8px', fontSize: '15px', backgroundColor: '#fff',
                  color: 'var(--color-deep-charcoal)', border: '1px solid var(--color-light-gray)',
                  cursor: noteBody.trim() ? 'pointer' : 'default', fontFamily: 'inherit'
                }}
              >
                Copy Formatted Note
              </button>
              <button
                onClick={handleClear}
                style={{
                  padding: '14px 20px', borderRadius: '8px', fontSize: '15px',
                  backgroundColor: '#fff', color: 'var(--color-muted-sage)',
                  border: '1px solid var(--color-light-gray)', cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                Clear
              </button>
            </div>
            {editingId && (
              <button
                onClick={handleClear}
                style={{
                  padding: '10px', borderRadius: '8px', fontSize: '14px',
                  backgroundColor: 'var(--color-warm-ivory)', color: 'var(--color-deep-charcoal)',
                  border: '1px solid var(--color-light-gray)', cursor: 'pointer', fontFamily: 'inherit'
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Saved notes list */}
        <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-deep-charcoal)', margin: 0 }}>
            Saved Notes ({displayedNotes.length})
          </h3>

          {displayedNotes.length === 0 ? (
            <p style={{ fontSize: '14px', color: 'var(--color-muted-sage)', padding: '20px 0' }}>
              No notes saved yet. Notes remain saved locally on this device after refresh.
            </p>
          ) : (
            displayedNotes.map(note => (
              <div key={note.id} className="note-card">
                <div className="note-card-header">
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '4px' }}>
                      {note.title}
                    </div>
                    <div className="note-card-meta">
                      <span className="note-badge note-badge-category">{note.category}</span>
                      <span className="note-badge note-badge-date">{note.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="note-card-preview">{note.body}</div>
                <div className="note-card-actions">
                  <button onClick={() => handleEdit(note)}>Edit</button>
                  <button onClick={() => void handleCopyNote(note.body)}>Copy</button>
                  <button onClick={() => void handleCopyFormattedNote(note)}>Copy Formatted Note</button>
                  <button className="note-delete-btn" onClick={() => handleDelete(note.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesView;
