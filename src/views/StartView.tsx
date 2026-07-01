import React from 'react';

interface StartViewProps {
  workspace: 'medspa' | 'partner';
  onLiveModeSelect: (scenario: string | null) => void;
  onOutreachModeSelect: (modeId: string) => void;
  onOpenSafety: () => void;
  onOpenCadence: () => void;
}

const StartView: React.FC<StartViewProps> = ({ workspace, onLiveModeSelect, onOutreachModeSelect, onOpenSafety, onOpenCadence }) => {
  return (
    <div className="flex-col gap-6 pb-6">
      <div className="mb-4">
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>What are you doing right now?</h2>
        <p style={{ color: 'var(--color-muted-sage)' }}>Protect patient opportunities.</p>
      </div>

      {workspace === 'medspa' && (
        <div className="flex-col gap-4">
          <h3 className="label-text">Med Spa Outreach</h3>
          
          <button className="card btn-secondary" onClick={() => onLiveModeSelect(null)} style={{ textAlign: 'left', padding: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Call a Med Spa</div>
            <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Receptionist or Owner cold call</p>
          </button>

          <button className="card btn-secondary" onClick={() => onOutreachModeSelect('email_mode')} style={{ textAlign: 'left', padding: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Send Email</div>
            <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Tier-A research or post-call follow-up</p>
          </button>

          <button className="card btn-secondary" onClick={() => onOutreachModeSelect('ig_mode')} style={{ textAlign: 'left', padding: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Instagram DM</div>
            <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Relationship-first outreach</p>
          </button>

          <div className="flex gap-4">
            <button className="card btn-secondary flex-1" onClick={() => onLiveModeSelect('fit_call')} style={{ padding: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>Fit Call</div>
            </button>
            <button className="card btn-secondary flex-1" onClick={() => onLiveModeSelect('sales_demo')} style={{ padding: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>Sales/Demo</div>
            </button>
          </div>
        </div>
      )}

      {workspace === 'partner' && (
        <div className="flex-col gap-4 mt-6">
          <h3 className="label-text">Referral Partners</h3>
          
          <button className="card btn-secondary" onClick={() => onLiveModeSelect(null)} style={{ textAlign: 'left', padding: '16px', borderColor: 'var(--color-muted-sage)' }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Referral Partner Call</div>
            <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Agencies, reps, consultants</p>
          </button>
        </div>
      )}

      <div className="flex-col gap-4 mt-6">
        <h3 className="label-text">Quick Links</h3>
        <button className="card btn-secondary" onClick={onOpenCadence} style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>8-Touch Cadence</div>
        </button>
        <button className="card btn-secondary" onClick={onOpenSafety} style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Positioning / Safety Rules</div>
        </button>
      </div>
    </div>
  );
};

export default StartView;
