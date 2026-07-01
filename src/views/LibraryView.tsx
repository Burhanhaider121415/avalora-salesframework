import React, { useState } from 'react';
import { medSpaLibrary, partnerLibrary } from '../data/libraryData';

interface LibraryViewProps {
  workspace: 'medspa' | 'partner';
}

const LibraryView: React.FC<LibraryViewProps> = ({ workspace }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const activeLibrary = workspace === 'medspa' ? medSpaLibrary : partnerLibrary;

  const filteredLibrary = activeLibrary.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-col" style={{ padding: '24px 16px', gap: '24px', paddingBottom: '100px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>
          {workspace === 'medspa' ? 'Med Spa Owner Library' : 'Referral Partner Library'}
        </h2>
        <p className="body-text" style={{ color: 'var(--color-slate-grey)' }}>
          Complete frameworks, reference materials, and guidelines.
        </p>
      </div>

      <input 
        type="text" 
        placeholder="Search library..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid var(--color-border)',
          backgroundColor: '#fff',
          fontSize: '16px'
        }}
      />

      <div className="flex-col gap-4">
        {filteredLibrary.map(item => (
          <div key={item.id} style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            overflow: 'hidden'
          }}>
            <div 
              onClick={() => toggleAccordion(item.id)}
              style={{
                padding: '16px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: expandedItems[item.id] ? 'var(--color-warm-ivory)' : '#fff',
                borderBottom: expandedItems[item.id] ? '1px solid var(--color-border)' : 'none'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-deep-charcoal)' }}>{item.title}</h3>
              <span style={{ color: 'var(--color-slate-grey)' }}>
                {expandedItems[item.id] ? '▲' : '▼'}
              </span>
            </div>
            
            {expandedItems[item.id] && (
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h4 className="label-text">Purpose</h4>
                  <p className="body-text">{item.purpose}</p>
                </div>
                <div>
                  <h4 className="label-text">Primary Goal</h4>
                  <p className="body-text" style={{ fontWeight: 500 }}>{item.primaryGoal}</p>
                </div>
                <div>
                  <h4 className="label-text">When to Use</h4>
                  <p className="body-text">{item.whenToUse}</p>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <h4 className="label-text" style={{ marginBottom: '8px' }}>Framework Sections</h4>
                  {item.sections.map(sec => (
                    <div key={sec.id} style={{
                      backgroundColor: 'var(--color-warm-ivory)',
                      padding: '12px',
                      borderRadius: '8px',
                      marginBottom: '8px',
                      border: '1px solid var(--color-border)'
                    }}>
                      <h5 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{sec.title}</h5>
                      <p className="body-text" style={{ whiteSpace: 'pre-line' }}>{sec.content}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2" style={{ flexWrap: 'wrap', marginTop: '12px' }}>
                  {item.relatedLiveMode && (
                    <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'rgba(217,119,87,0.1)', color: 'var(--color-accent-amber)', borderRadius: '4px', fontWeight: 500 }}>
                      Live Mode Linked
                    </span>
                  )}
                  {item.relatedObjections && (
                    <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'rgba(92,112,94,0.1)', color: 'var(--color-accent-sage)', borderRadius: '4px', fontWeight: 500 }}>
                      Objections Linked
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {filteredLibrary.length === 0 && (
          <p className="body-text" style={{ textAlign: 'center', padding: '24px', color: 'var(--color-slate-grey)' }}>
            No frameworks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default LibraryView;
