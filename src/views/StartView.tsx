import React from 'react';

interface StartViewProps {
  onLiveModeSelect: (scenario: string | null) => void;
  onOutreachModeSelect: (modeId: string) => void;
  onOpenSafety: () => void;
  onOpenCadence: () => void;
  onOpenNotes: () => void;
}

const StartView: React.FC<StartViewProps> = ({ onLiveModeSelect, onOutreachModeSelect, onOpenSafety, onOpenCadence, onOpenNotes }) => {
  return (
    <div className="flex-col gap-6 pb-6">
      <div className="mb-4">
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>What are you doing right now?</h2>
        <p style={{ color: 'var(--color-muted-sage)' }}>Protect patient opportunities.</p>
      </div>

      <div className="flex-col gap-4">
        <h3 className="label-text">Med Spa Calls</h3>
        <div className="start-action-grid">
          <button className="card btn-secondary" onClick={() => onLiveModeSelect('medspa_gatekeeper')} style={{ textAlign: 'left', padding: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Receptionist / Gatekeeper</div>
            <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Start the med spa gatekeeper script</p>
          </button>
          <button className="card btn-secondary" onClick={() => onLiveModeSelect('medspa_owner')} style={{ textAlign: 'left', padding: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Owner / Operator</div>
            <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Start the direct owner call script</p>
          </button>
        </div>
      </div>

      <div className="flex-col gap-4">
        <h3 className="label-text">Email and Instagram</h3>
        <div className="start-action-grid">
          <button className="card btn-secondary" onClick={() => onOutreachModeSelect('email_mode')} style={{ textAlign: 'left', padding: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Send Email</div>
            <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Tier-A research or post-call follow-up</p>
          </button>

          <button className="card btn-secondary" onClick={() => onOutreachModeSelect('ig_mode')} style={{ textAlign: 'left', padding: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Instagram DM</div>
            <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Relationship-first outreach</p>
          </button>
        </div>

          <div className="flex gap-4">
            <button className="card btn-secondary flex-1" onClick={() => onLiveModeSelect('fit_call')} style={{ padding: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>Fit Call</div>
            </button>
            <button className="card btn-secondary flex-1" onClick={() => onLiveModeSelect('sales_demo')} style={{ padding: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>Sales/Demo</div>
            </button>
          </div>
      </div>

      <div className="flex-col gap-4">
        <h3 className="label-text">Referral Partner Calls</h3>
        <div className="start-action-grid">
          <button className="card btn-secondary" onClick={() => onLiveModeSelect('partner_gatekeeper')} style={{ textAlign: 'left', padding: '16px', borderColor: 'var(--color-muted-sage)' }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Partner Gatekeeper</div>
            <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Use when a receptionist or assistant answers</p>
          </button>
          <button className="card btn-secondary" onClick={() => onLiveModeSelect('partner_live')} style={{ textAlign: 'left', padding: '16px', borderColor: 'var(--color-muted-sage)' }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Partner Live Call</div>
            <p style={{ color: 'var(--color-muted-sage)', fontSize: '14px', marginTop: '4px' }}>Use when the referral partner is on the phone</p>
          </button>
        </div>
      </div>

      <div className="flex-col gap-4 mt-6">
        <h3 className="label-text">Quick Links</h3>
        <button className="card btn-secondary" onClick={onOpenCadence} style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>View Outreach Cadence</div>
        </button>
        <button className="card btn-secondary" onClick={onOpenSafety} style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Positioning / Safety Rules</div>
        </button>
        <button className="card btn-secondary" onClick={onOpenNotes} style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Open Notes</div>
        </button>
      </div>
    </div>
  );
};

export default StartView;
