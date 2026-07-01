import React from 'react';
import { cadenceSteps } from '../data/cadenceData';
import type { NoteContext } from '../types/app';

interface CadenceViewProps {
  onGoToLiveMode: (scenario: string | null) => void;
  onGoToEmailMode: () => void;
  onGoToInstagramMode: () => void;
  onOpenNotes: (context: NoteContext) => void;
}

const CadenceView: React.FC<CadenceViewProps> = ({
  onGoToLiveMode,
  onGoToEmailMode,
  onGoToInstagramMode,
  onOpenNotes,
}) => {
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
              position: 'relative',
            }}
          >
            <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-charcoal)' }}>
                Touch {step.touch} • {step.day}
              </span>
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
              <button
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={() => {
                  if (step.link === 'email') onOpenNotes('email');
                  if (step.link === 'ig') onOpenNotes('ig');
                  if (step.link === 'both') onOpenNotes('email');
                  if (step.link === 'call') onOpenNotes('gatekeeper');
                }}
              >
                Add Note
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CadenceView;
