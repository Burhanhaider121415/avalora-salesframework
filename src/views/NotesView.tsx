import React from 'react';

interface NotesViewProps {
  workspace: 'medspa' | 'partner';
}

const NotesView: React.FC<NotesViewProps> = ({ workspace }) => {
  return (
    <div className="flex-col gap-6">
      <div className="mb-2">
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Quick Notes</h2>
        <p style={{ color: 'var(--color-muted-sage)' }}>Structured capture for Google Sheets.</p>
      </div>

      <div className="flex-col gap-4">
        <label className="label-text">Situation</label>
        <select className="card" style={{ width: '100%', padding: '12px', fontSize: '16px', border: '2px solid var(--color-light-gray)' }}>
          <option>Gatekeeper Call</option>
          <option>Owner Call</option>
          <option>Referral Partner Call</option>
          <option>Instagram DM</option>
        </select>

        <label className="label-text mt-2">Clinic / Partner Name</label>
        <input type="text" className="card" style={{ padding: '12px', fontSize: '16px', border: '2px solid var(--color-light-gray)' }} />

        <label className="label-text mt-2">Contact Name & Role</label>
        <input type="text" className="card" style={{ padding: '12px', fontSize: '16px', border: '2px solid var(--color-light-gray)' }} />

        <label className="label-text mt-2">Key Objection / Pain Point</label>
        <textarea className="card" style={{ padding: '12px', fontSize: '16px', border: '2px solid var(--color-light-gray)', minHeight: '80px', fontFamily: 'inherit' }}></textarea>

        <label className="label-text mt-2">Next Step</label>
        <input type="text" className="card" style={{ padding: '12px', fontSize: '16px', border: '2px solid var(--color-light-gray)' }} placeholder="e.g. Fit call booked, Demo sent" />
      </div>

      <button className="btn btn-primary mt-6">Copy for Google Sheet</button>
    </div>
  );
};

export default NotesView;
