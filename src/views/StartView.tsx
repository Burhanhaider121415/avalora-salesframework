import React from 'react';

interface StartViewProps {
  onSelectMode: (scenario: string, workspace: 'medspa' | 'partner') => void;
  onOpenSafety: () => void;
}

const StartView: React.FC<StartViewProps> = ({ onSelectMode, onOpenSafety }) => {
  return (
    <div className="flex-col gap-6">
      <div className="mb-4">
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>What are you doing right now?</h2>
        <p style={{ color: 'var(--color-muted-sage)' }}>Protect patient opportunities.</p>
      </div>

      <div className="flex-col gap-4">
        <h3 className="label-text">Med Spa Outreach</h3>
        
        <button className="card btn-secondary" onClick={() => onSelectMode('call_medspa', 'medspa')} style={{ textAlign: 'left', padding: '16px' }}>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>Call a Med Spa</div>
          <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Receptionist or Owner cold call</p>
        </button>

        <button className="card btn-secondary" onClick={() => onSelectMode('email_medspa', 'medspa')} style={{ textAlign: 'left', padding: '16px' }}>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>Send Email</div>
          <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Tier-A research or post-call follow-up</p>
        </button>

        <button className="card btn-secondary" onClick={() => onSelectMode('ig_medspa', 'medspa')} style={{ textAlign: 'left', padding: '16px' }}>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>Instagram DM</div>
          <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Relationship-first outreach</p>
        </button>

        <div className="flex gap-4">
          <button className="card btn-secondary flex-1" onClick={() => onSelectMode('fit_call', 'medspa')} style={{ padding: '16px' }}>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Fit Call</div>
          </button>
          <button className="card btn-secondary flex-1" onClick={() => onSelectMode('sales_demo', 'medspa')} style={{ padding: '16px' }}>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Sales/Demo</div>
          </button>
        </div>
      </div>

      <div className="flex-col gap-4 mt-6">
        <h3 className="label-text">Referral Partners</h3>
        
        <button className="card btn-secondary" onClick={() => onSelectMode('call_partner', 'partner')} style={{ textAlign: 'left', padding: '16px', borderColor: 'var(--color-muted-sage)' }}>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>Referral Partner Call</div>
          <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Agencies, reps, consultants</p>
        </button>
      </div>

      <div className="flex-col gap-4 mt-6">
        <h3 className="label-text">Quick Links</h3>
        <button className="card btn-secondary" onClick={onOpenSafety} style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Positioning / Safety Rules</div>
        </button>
      </div>
    </div>
  );
};

export default StartView;
