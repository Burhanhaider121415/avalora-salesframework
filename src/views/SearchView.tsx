import React, { useEffect, useMemo, useState } from 'react';
import { searchEntries, type SearchContext } from '../data/searchEntries';
import type { NoteContext, Workspace } from '../types/app';
import { getSearchResults } from '../utils/search';

interface SearchViewProps {
  workspace: Workspace;
  onGoToLiveMode: (scenario: string | null) => void;
  onGoToLibrary: (workspace?: Workspace) => void;
  onGoToOutreachMode: (modeId: string) => void;
  onOpenNotes: (context: NoteContext) => void;
}

const CONTEXT_FILTERS: Array<'all' | SearchContext> = [
  'all',
  'gatekeeper',
  'owner',
  'fit_call',
  'demo',
  'email',
  'ig',
  'partner',
  'safety',
  'cadence',
];

const SearchView: React.FC<SearchViewProps> = ({
  workspace,
  onGoToLiveMode,
  onGoToLibrary,
  onGoToOutreachMode,
  onOpenNotes,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | Workspace>(workspace);
  const [activeContext, setActiveContext] = useState<'all' | SearchContext>('all');

  useEffect(() => {
    setActiveFilter(workspace);
  }, [workspace]);

  const filteredResults = useMemo(() => {
    return getSearchResults(searchEntries, searchTerm, activeFilter, activeContext, workspace);
  }, [activeContext, activeFilter, searchTerm, workspace]);

  if (searchEntries.length === 0) {
    return (
      <div className="flex-col" style={{ padding: '24px 16px', gap: '24px', paddingBottom: '100px' }}>
        <div style={{ padding: '24px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: '12px', textAlign: 'center' }}>
          <p className="body-text" style={{ color: 'var(--color-deep-charcoal)' }}>
            Search could not load. Use Library tab or refresh.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col" style={{ padding: '24px 16px', gap: '24px', paddingBottom: '100px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>
          Emergency Search & Objections
        </h2>
        <input
          type="text"
          placeholder="Search what they said or what you need..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: '2px solid var(--color-accent-amber)',
            backgroundColor: '#fff',
            fontSize: '16px',
            boxShadow: '0 4px 12px rgba(217,119,87,0.1)',
          }}
        />
      </div>

      <div className="flex gap-2" style={{ overflowX: 'auto', paddingBottom: '8px' }}>
        <button className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveFilter('all')}>All Workspaces</button>
        <button className={`btn ${activeFilter === 'medspa' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveFilter('medspa')}>Med Spa</button>
        <button className={`btn ${activeFilter === 'partner' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveFilter('partner')}>Partner</button>
      </div>

      <div className="flex gap-2" style={{ overflowX: 'auto', paddingBottom: '8px', marginTop: '-12px' }}>
        {CONTEXT_FILTERS.map((context) => (
          <button
            key={context}
            className={`btn ${activeContext === context ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 12px', fontSize: '12px', textTransform: 'capitalize', backgroundColor: activeContext === context ? 'var(--color-slate-grey)' : '' }}
            onClick={() => setActiveContext(context)}
          >
            {context}
          </button>
        ))}
      </div>

      <div className="flex-col gap-4">
        {!searchTerm.trim() ? (
          <div style={{ padding: '24px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: '12px', textAlign: 'center' }}>
            <p className="body-text" style={{ color: 'var(--color-deep-charcoal)' }}>
              Search terms like &apos;send info,&apos; &apos;price,&apos; &apos;HIPAA,&apos; or &apos;partner payout&apos;.
            </p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div style={{ padding: '24px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: '12px', textAlign: 'center' }}>
            <p className="body-text" style={{ color: 'var(--color-deep-charcoal)' }}>
              No exact match yet. Try a simpler phrase like &apos;send info,&apos; &apos;price,&apos; &apos;HIPAA,&apos; or &apos;owner busy&apos;.
            </p>
          </div>
        ) : (
          filteredResults.map((entry) => {
            const liveMode = entry.relatedLiveMode ?? null;
            const outreachMode = entry.relatedOutreachMode ?? null;
            const libraryWorkspace = entry.relatedLibraryWorkspace ?? null;
            const notesField = entry.relatedNotesField ?? null;

            return (
              <div key={entry.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
                  <div className="flex" style={{ gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10px', padding: '4px 8px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {entry.workspace} • {entry.context}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '4px' }}>{entry.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-slate-grey)', fontStyle: 'italic' }}>Safe language: {entry.safeLanguage}</p>
                </div>

                <div style={{ padding: '16px', backgroundColor: 'var(--color-soft-champagne)' }}>
                  <h4 className="label-text" style={{ color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>Best Answer / Use This</h4>
                  <p className="body-text" style={{ fontWeight: 500 }}>{entry.answer}</p>

                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '14px', color: 'var(--color-slate-grey)' }}><strong>Next step:</strong> {entry.nextStep}</p>
                    {notesField && (
                      <p style={{ fontSize: '14px', color: 'var(--color-slate-grey)' }}><strong>Related notes field:</strong> {notesField.replace('_', ' ')}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2" style={{ padding: '12px 16px', backgroundColor: '#fafafa', borderTop: '1px solid var(--color-border)', overflowX: 'auto' }}>
                  {liveMode && (
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onGoToLiveMode(liveMode)}>
                      Open Live Mode
                    </button>
                  )}
                  {outreachMode && (
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onGoToOutreachMode(outreachMode)}>
                      Open Outreach
                    </button>
                  )}
                  {libraryWorkspace && (
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onGoToLibrary(libraryWorkspace)}>
                      Full Framework
                    </button>
                  )}
                  {notesField && (
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onOpenNotes(notesField)}>
                      Add Note
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchView;
