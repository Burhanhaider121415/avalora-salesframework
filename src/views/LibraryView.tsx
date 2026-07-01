import React from 'react';

const LibraryView: React.FC = () => {
  return (
    <div className="flex-col gap-6">
      <div className="mb-2">
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Framework Library</h2>
        <p style={{ color: 'var(--color-muted-sage)' }}>Full scripts and operating manuals.</p>
      </div>

      <div className="flex-col gap-4">
        <h3 className="label-text">Med Spa Owner</h3>
        <button className="card btn-secondary" style={{ textAlign: 'left', padding: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Receptionist / Gatekeeper Path</div>
        </button>
        <button className="card btn-secondary" style={{ textAlign: 'left', padding: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Owner / Operator Cold Call</div>
        </button>
        <button className="card btn-secondary" style={{ textAlign: 'left', padding: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Email Outreach OS</div>
        </button>
        <button className="card btn-secondary" style={{ textAlign: 'left', padding: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Instagram Outreach OS</div>
        </button>
      </div>

      <div className="flex-col gap-4 mt-4">
        <h3 className="label-text">Referral Partner</h3>
        <button className="card btn-secondary" style={{ textAlign: 'left', padding: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Partner Gatekeeper Script</div>
        </button>
        <button className="card btn-secondary" style={{ textAlign: 'left', padding: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Partner Live Call Framework</div>
        </button>
      </div>
    </div>
  );
};

export default LibraryView;
