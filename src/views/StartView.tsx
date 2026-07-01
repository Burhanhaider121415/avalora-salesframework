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

      {/* ── Flow of Reaching Out ── */}
      <div className="flex-col gap-4 mt-6">
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-deep-charcoal)', marginBottom: '4px' }}>
          Flow of Reaching Out
        </h3>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '1px solid var(--color-light-gray)',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-deep-charcoal)', color: '#fff' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: '13px' }}>Touch</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: '13px' }}>Day</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: '13px' }}>Channel</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: '13px' }}>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1', 'Day 1', 'Instagram soft touch', 'Create light familiarity'],
                ['2', 'Day 1', 'Call', 'Try live access / find route to owner'],
                ['3', 'Day 2', 'Instagram DM', 'Main direct-owner message'],
                ['4', 'Day 4', 'Email', 'Backup/proof/forwardable message'],
                ['5', 'Day 6', 'Call', 'Second live attempt with context'],
                ['6', 'Day 9', 'Instagram DM follow-up', 'Push the core pain again'],
                ['7', 'Day 14', 'Email follow-up and DM', 'Professional follow-up / value angle'],
                ['8', 'Day 18–21', 'Final call or DM', 'Close loop'],
              ].map(([touch, day, channel, purpose], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-light-gray)', backgroundColor: i % 2 === 0 ? '#fff' : 'var(--color-warm-ivory)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-soft-amber)' }}>{touch}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 500 }}>{day}</td>
                  <td style={{ padding: '10px 14px' }}>{channel}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--color-muted-sage)' }}>{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
