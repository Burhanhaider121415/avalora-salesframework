import React from 'react';

interface CadenceViewProps {
  onGoToLiveMode: (scenario: string | null) => void;
  onGoToEmailMode: () => void;
  onGoToInstagramMode: () => void;
  onOpenNotes: () => void;
}

const cadenceSteps = [
  {
    touch: 1,
    day: 'Day 1',
    channel: 'Instagram',
    action: 'Instagram soft touch — Create light familiarity',
    link: 'ig',
    bgColor: '#FFF5F0',
    borderColor: 'var(--color-accent-amber)'
  },
  {
    touch: 2,
    day: 'Day 1',
    channel: 'Call',
    action: 'Call — Try live access / find route to owner',
    link: 'call',
    bgColor: '#F5F9F6',
    borderColor: 'var(--color-accent-sage)'
  },
  {
    touch: 3,
    day: 'Day 2',
    channel: 'Instagram',
    action: 'Instagram DM — Main direct-owner message',
    link: 'ig',
    bgColor: '#FFF5F0',
    borderColor: 'var(--color-accent-amber)'
  },
  {
    touch: 4,
    day: 'Day 4',
    channel: 'Email',
    action: 'Email — Backup/proof/forwardable message',
    link: 'email',
    bgColor: '#FAFAFA',
    borderColor: 'var(--color-deep-charcoal)'
  },
  {
    touch: 5,
    day: 'Day 6',
    channel: 'Call',
    action: 'Call — Second live attempt with context',
    link: 'call',
    bgColor: '#F5F9F6',
    borderColor: 'var(--color-accent-sage)'
  },
  {
    touch: 6,
    day: 'Day 9',
    channel: 'Instagram',
    action: 'Instagram DM follow-up — Push the core pain again',
    link: 'ig',
    bgColor: '#FFF5F0',
    borderColor: 'var(--color-accent-amber)'
  },
  {
    touch: 7,
    day: 'Day 14',
    channel: 'Email & DM',
    action: 'Email follow-up and DM — Professional follow-up / value angle',
    link: 'both',
    bgColor: '#FAFAFA',
    borderColor: 'var(--color-deep-charcoal)'
  },
  {
    touch: 8,
    day: 'Day 18–21',
    channel: 'Call or DM',
    action: 'Final call or DM — Close loop',
    link: 'call',
    bgColor: '#F5F9F6',
    borderColor: 'var(--color-accent-sage)'
  }
];

const CadenceView: React.FC<CadenceViewProps> = ({ onGoToLiveMode, onGoToEmailMode, onGoToInstagramMode, onOpenNotes }) => {
  return (
    <div className="flex-col" style={{ padding: '24px 16px', gap: '24px', paddingBottom: '100px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>
          8-Touch Cadence
        </h2>
        <p className="body-text" style={{ color: 'var(--color-slate-grey)' }}>
          Follow this cadence strictly for every qualified prospect. Do not add automation.
        </p>
      </div>

      <div className="flex-col gap-4">
        {cadenceSteps.map((step) => (
          <div 
            key={step.touch} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              backgroundColor: step.bgColor, 
              border: `1px solid ${step.borderColor}`, 
              borderRadius: '12px', 
              padding: '16px',
              position: 'relative'
            }}
          >
            <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-charcoal)' }}>Touch {step.touch} • {step.day}</span>
              <span style={{ fontSize: '10px', padding: '4px 8px', backgroundColor: '#fff', border: `1px solid ${step.borderColor}`, borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', color: step.borderColor }}>
                {step.channel}
              </span>
            </div>
            
            <p className="body-text" style={{ fontWeight: 500, color: 'var(--color-deep-charcoal)', marginBottom: '16px' }}>
              {step.action}
            </p>

            <div className="flex gap-2" style={{ borderTop: `1px solid ${step.borderColor}50`, paddingTop: '12px', overflowX: 'auto' }}>
              {step.link === 'call' && (
                <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onGoToLiveMode(null)}>Open Call Mode</button>
              )}
              {step.link === 'email' && (
                <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={onGoToEmailMode}>Open Email Mode</button>
              )}
              {step.link === 'ig' && (
                <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={onGoToInstagramMode}>Open Instagram Mode</button>
              )}
              {step.link === 'both' && (
                <>
                  <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={onGoToEmailMode}>Email Mode</button>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={onGoToInstagramMode}>IG Mode</button>
                </>
              )}
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={onOpenNotes}>Add Note</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CadenceView;
