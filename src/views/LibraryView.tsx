import React, { useState } from 'react';
import { medSpaLibrary, partnerLibrary } from '../data/libraryData';
import type { LibrarySection } from '../data/libraryData';
import { cadenceSteps } from '../data/cadenceData';

interface LibraryViewProps {
  workspace: 'medspa' | 'partner';
}

/**
 * Renders raw framework text with visual hierarchy.
 * Detects headings, bullets, script lines, warnings, and separates them.
 * Does NOT summarize, delete, or rewrite any source text.
 */
function renderFrameworkText(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let listItems: string[] = [];
  let inWarningBlock = false;
  let warningLines: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const joined = currentParagraph.join(' ').trim();
      if (joined) {
        elements.push(<p key={`p-${elements.length}`}>{joined}</p>);
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`}>
          {listItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
      listItems = [];
    }
  };

  const flushWarning = () => {
    if (warningLines.length > 0) {
      elements.push(
        <div key={`warn-${elements.length}`} className="warning-block">
          <strong>⚠ Do Not Say / Warning</strong>
          {warningLines.map((line, i) => <p key={i}>{line}</p>)}
        </div>
      );
      warningLines = [];
      inWarningBlock = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    // Detect warning/do-not-say sections
    const lowerTrimmed = trimmed.toLowerCase();
    if (lowerTrimmed.startsWith('do not say') || lowerTrimmed.startsWith('do not:') || lowerTrimmed.startsWith('never say') || lowerTrimmed.startsWith('⚠') || lowerTrimmed.startsWith('warning:')) {
      flushParagraph();
      flushList();
      inWarningBlock = true;
      warningLines.push(trimmed);
      continue;
    }

    if (inWarningBlock) {
      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('–') || trimmed.startsWith('*')) {
        warningLines.push(trimmed.replace(/^[•\-–*]\s*/, ''));
        continue;
      } else {
        flushWarning();
      }
    }

    // Detect script/say-this blocks (quoted speech)
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
      flushParagraph();
      flushList();
      elements.push(
        <div key={`script-${elements.length}`} className="script-block">
          {trimmed}
        </div>
      );
      continue;
    }

    // Detect objection/response patterns
    if (lowerTrimmed.startsWith('objection:') || lowerTrimmed.startsWith('response:') || lowerTrimmed.startsWith('if they say:') || lowerTrimmed.startsWith('you say:')) {
      flushParagraph();
      flushList();
      elements.push(
        <div key={`obj-${elements.length}`} className="objection-block">
          <p><strong>{trimmed.split(':')[0]}:</strong> {trimmed.split(':').slice(1).join(':')}</p>
        </div>
      );
      continue;
    }

    // Detect bullet/list items
    if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('– ') || (trimmed.startsWith('* ') && !trimmed.startsWith('**'))) {
      flushParagraph();
      listItems.push(trimmed.replace(/^[•\-–*]\s*/, ''));
      continue;
    }

    // Detect numbered list items
    if (/^\d+[.)]\s/.test(trimmed)) {
      flushParagraph();
      listItems.push(trimmed.replace(/^\d+[.)]\s*/, ''));
      continue;
    }

    // Flush any pending list before headings
    flushList();

    // Detect headings (ALL CAPS lines over 4 chars, or lines ending with colon that are short)
    const isAllCaps = trimmed.length > 4 && trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed) && !trimmed.startsWith('"');
    const isColonHeading = trimmed.endsWith(':') && trimmed.length < 80 && !trimmed.includes('. ');

    if (isAllCaps) {
      flushParagraph();
      elements.push(<h3 key={`h3-${elements.length}`}>{trimmed}</h3>);
      continue;
    }

    if (isColonHeading && trimmed.length < 60) {
      flushParagraph();
      elements.push(<h4 key={`h4-${elements.length}`}>{trimmed.replace(/:$/, '')}</h4>);
      continue;
    }

    // Regular paragraph text
    currentParagraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushWarning();

  return elements;
}

function renderSection(sec: LibrarySection) {
  return (
    <div key={sec.id} className="framework-section-card">
      <h2 style={{ marginTop: 0 }}>{sec.title}</h2>
      <div className="framework-content">
        {renderFrameworkText(sec.content)}
      </div>
    </div>
  );
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
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>
          {workspace === 'medspa' ? 'Med Spa Owner Library' : 'Referral Partner Library'}
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--color-muted-sage)', lineHeight: 1.5 }}>
          Complete frameworks, reference materials, and guidelines. Click any document to expand the full source text.
        </p>
      </div>

      <input 
        type="text" 
        placeholder="Search library..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '14px 18px',
          borderRadius: '10px',
          border: '1px solid var(--color-border)',
          backgroundColor: '#fff',
          fontSize: '16px'
        }}
      />

      {workspace === 'medspa' && !searchTerm && (
        <details className="framework-section-card" open>
          <summary style={{ cursor: 'pointer', fontSize: '18px', fontWeight: 600 }}>8-Touch Cadence</summary>
          <div className="framework-content" style={{ marginTop: '14px' }}>
            {cadenceSteps.map((step) => <p key={step.touch}><strong>Touch {step.touch} · {step.day} · {step.channel}:</strong> {step.action}</p>)}
          </div>
        </details>
      )}

      <div className="flex-col" style={{ gap: '16px' }}>
        {filteredLibrary.map(item => (
          <div key={item.id} style={{
            backgroundColor: '#fff',
            borderRadius: '14px',
            border: '1px solid var(--color-light-gray)',
            overflow: 'hidden'
          }}>
            <div 
              className="library-doc-header"
              onClick={() => toggleAccordion(item.id)}
              style={{
                backgroundColor: expandedItems[item.id] ? 'var(--color-warm-ivory)' : '#fff',
              }}
            >
              <h3>{item.title}</h3>
              <span style={{ fontSize: '18px', color: 'var(--color-muted-sage)', userSelect: 'none' }}>
                {expandedItems[item.id] ? '▲' : '▼'}
              </span>
            </div>
            
            {expandedItems[item.id] && (
              <div className="library-doc-body">
                <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', padding: '4px 10px', backgroundColor: 'rgba(212,163,115,0.12)', borderRadius: '6px', color: '#9a6f3e', fontWeight: 500 }}>
                    {item.purpose}
                  </span>
                  {item.relatedLiveMode && (
                    <span style={{ fontSize: '13px', padding: '4px 10px', backgroundColor: 'rgba(217,119,87,0.1)', borderRadius: '6px', color: 'var(--color-soft-amber)', fontWeight: 500 }}>
                      Live Mode Linked
                    </span>
                  )}
                </div>

                {item.sections.map(sec => renderSection(sec))}
              </div>
            )}
          </div>
        ))}
        {filteredLibrary.length === 0 && (
          <p style={{ textAlign: 'center', padding: '32px', color: 'var(--color-muted-sage)', fontSize: '16px' }}>
            No frameworks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default LibraryView;
