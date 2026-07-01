import React, { useState } from 'react';
import { objectionBank, type Objection } from '../data/objectionsData';

interface SearchViewProps {
  onGoToLiveMode: (scenario: string | null) => void;
  onGoToLibrary: () => void;
  onOpenNotes: () => void;
}

const SearchView: React.FC<SearchViewProps> = ({ onGoToLiveMode, onGoToLibrary, onOpenNotes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'medspa' | 'partner'>('all');
  const [activeContext, setActiveContext] = useState<string>('all');

  const filteredObjections: Objection[] = objectionBank.filter((obj: Objection) => {
    const matchesSearch = obj.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          obj.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          obj.whatTheySaid.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesWorkspace = activeFilter === 'all' || obj.workspace === activeFilter || obj.workspace === 'all';
    const matchesContext = activeContext === 'all' || obj.context === activeContext || obj.context === 'all';
    
    return matchesSearch && matchesWorkspace && matchesContext;
  });

  return (
    <div className="flex-col" style={{ padding: '24px 16px', gap: '24px', paddingBottom: '100px' }}>
      
      {/* Header & Search */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>
          Emergency Search & Objections
        </h2>
        <input 
          type="text" 
          placeholder="Search what they said or what you need..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: '2px solid var(--color-accent-amber)',
            backgroundColor: '#fff',
            fontSize: '16px',
            boxShadow: '0 4px 12px rgba(217,119,87,0.1)'
          }}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2" style={{ overflowX: 'auto', paddingBottom: '8px' }}>
        <button className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveFilter('all')}>All Workspaces</button>
        <button className={`btn ${activeFilter === 'medspa' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveFilter('medspa')}>Med Spa</button>
        <button className={`btn ${activeFilter === 'partner' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveFilter('partner')}>Partner</button>
      </div>
      
      <div className="flex gap-2" style={{ overflowX: 'auto', paddingBottom: '8px', marginTop: '-12px' }}>
        {['all', 'gatekeeper', 'owner', 'email', 'ig', 'demo', 'partner'].map(ctx => (
          <button 
            key={ctx}
            className={`btn ${activeContext === ctx ? 'btn-primary' : 'btn-secondary'}`} 
            style={{ padding: '6px 12px', fontSize: '12px', textTransform: 'capitalize', backgroundColor: activeContext === ctx ? 'var(--color-slate-grey)' : '' }} 
            onClick={() => setActiveContext(ctx)}
          >
            {ctx}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex-col gap-4">
        {filteredObjections.length === 0 ? (
          <div style={{ padding: '24px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: '12px', textAlign: 'center' }}>
            <p className="body-text" style={{ color: 'var(--color-deep-charcoal)' }}>
              No exact match yet. Try a simpler phrase like 'send info,' 'price,' 'HIPAA,' or 'owner busy'.
            </p>
          </div>
        ) : (
          filteredObjections.map(obj => (
            <div key={obj.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex" style={{ gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '10px', padding: '4px 8px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {obj.workspace} • {obj.context}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '4px' }}>"{obj.whatTheySaid}"</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-slate-grey)', fontStyle: 'italic' }}>Meaning: {obj.whatItMeans}</p>
              </div>
              
              <div style={{ padding: '16px', backgroundColor: 'var(--color-soft-champagne)' }}>
                <h4 className="label-text" style={{ color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>Best Answer / Use This</h4>
                <p className="body-text" style={{ fontWeight: 500 }}>{obj.response}</p>
                
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ fontSize: '14px', color: 'var(--color-slate-grey)' }}><strong>Why it works:</strong> {obj.whyItWorks}</p>
                  
                  {obj.doNotSay && (
                    <div style={{ padding: '8px', backgroundColor: '#FDECEA', borderRadius: '4px', borderLeft: '4px solid #E57373' }}>
                      <p style={{ fontSize: '12px', color: '#D32F2F', fontWeight: 600 }}>DO NOT SAY: {obj.doNotSay}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2" style={{ padding: '12px 16px', backgroundColor: '#fafafa', borderTop: '1px solid var(--color-border)', overflowX: 'auto' }}>
                {obj.relatedLiveMode && (
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onGoToLiveMode(obj.relatedLiveMode!)}>
                    Open Live Mode
                  </button>
                )}
                {obj.relatedLibraryId && (
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={onGoToLibrary}>
                    Full Framework
                  </button>
                )}
                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={onOpenNotes}>
                  Add Note
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default SearchView;
