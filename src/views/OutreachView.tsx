import React, { useMemo, useState } from 'react';
import { getTemplateFields, outreachTemplates } from '../data/outreachTemplates';
import type { NoteContext } from '../types/app';

interface OutreachViewProps {
  modeId: string;
  onClose: () => void;
  onOpenNotes?: (context: NoteContext) => void;
}

const OutreachView: React.FC<OutreachViewProps> = ({ modeId, onClose, onOpenNotes }) => {
  const channel = modeId === 'ig_mode' ? 'instagram' : 'email';
  const templates = useMemo(() => outreachTemplates.filter((template) => template.channel === channel), [channel]);
  const [selectedId, setSelectedId] = useState(templates[0]?.id ?? '');
  const [values, setValues] = useState<Record<string, string>>({});
  const [copyStatus, setCopyStatus] = useState('');
  const selected = templates.find((template) => template.id === selectedId) ?? templates[0];
  const fields = selected ? getTemplateFields(selected.body) : [];
  const completed = selected ? selected.body.replace(/\[([^\]]+)\]/g, (_, field: string) => values[field]?.trim() || `[${field}]`) : '';

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(completed);
      setCopyStatus('Copied');
    } catch {
      setCopyStatus('Copy failed');
    }
    window.setTimeout(() => setCopyStatus(''), 1800);
  };

  if (!selected) return null;
  return (
    <div className="flex-col gap-4" style={{ padding: '24px 16px 100px' }}>
      <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span className="label-text">{channel === 'email' ? 'Email outreach' : 'Instagram outreach'}</span>
          <h2 style={{ fontSize: '26px', marginTop: '5px' }}>{channel === 'email' ? 'Email Templates' : 'Instagram DM Templates'}</h2>
          <p style={{ color: 'var(--color-muted-sage)', marginTop: '6px', lineHeight: 1.45 }}>Choose the situation, complete only the fields this message uses, then copy the approved text.</p>
        </div>
        <button onClick={onClose} aria-label="Close outreach" style={{ border: 0, background: 'transparent', fontSize: '26px', cursor: 'pointer' }}>×</button>
      </div>
      <label className="label-text" htmlFor="outreach-template">Situation</label>
      <select id="outreach-template" value={selected.id} onChange={(event) => { setSelectedId(event.target.value); setValues({}); }} style={{ width: '100%', padding: '13px', borderRadius: '8px', border: '1px solid var(--color-light-gray)', fontFamily: 'inherit', fontSize: '15px' }}>
        {templates.map((template) => <option key={template.id} value={template.id}>{template.title}</option>)}
      </select>
      {fields.length > 0 && (
        <div className="card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Message details</h3>
          <div className="flex-col gap-3">
            {fields.map((field) => <label key={field} style={{ fontSize: '13px', fontWeight: 600 }}>{field}<input value={values[field] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))} placeholder={`Enter ${field}`} style={{ display: 'block', width: '100%', marginTop: '5px', padding: '10px', borderRadius: '7px', border: '1px solid var(--color-light-gray)', fontFamily: 'inherit' }} /></label>)}
          </div>
        </div>
      )}
      <div className="card" style={{ borderLeft: '4px solid var(--color-soft-amber)' }}>
        <span className="label-text">Ready to send</span>
        <pre style={{ whiteSpace: 'pre-wrap', margin: '10px 0 0', fontFamily: 'inherit', fontSize: '16px', lineHeight: 1.55 }}>{completed}</pre>
      </div>
      <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => void copyTemplate()} style={{ flex: '1 1 180px' }}>{copyStatus || 'Copy Message'}</button>
        {onOpenNotes && <button className="btn btn-secondary" onClick={() => onOpenNotes(channel === 'instagram' ? 'ig' : 'email')} style={{ flex: '1 1 180px' }}>Add Note</button>}
      </div>
      <details className="card" style={{ padding: '14px 16px' }}><summary style={{ cursor: 'pointer', fontWeight: 600 }}>Full framework reference</summary><p style={{ color: 'var(--color-muted-sage)', lineHeight: 1.5, marginTop: '10px' }}>Use the Library for the full operating manuals. This screen keeps the live task focused on the approved message and its required details.</p></details>
    </div>
  );
};

export default OutreachView;
