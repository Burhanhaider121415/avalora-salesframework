import React from 'react';

const PositioningSafetyView: React.FC = () => {
  return (
    <div className="flex-col gap-6">
      <div className="mb-4">
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Positioning & Safety</h2>
        <p style={{ color: 'var(--color-muted-sage)' }}>Core messaging rules.</p>
      </div>

      <div className="card" style={{ backgroundColor: 'var(--color-soft-champagne)', border: 'none' }}>
        <h3 className="label-text" style={{ color: 'var(--color-deep-charcoal)' }}>Safety Rule</h3>
        <p className="mt-2" style={{ fontWeight: 600, fontSize: '18px' }}>
          "Avalora does not diagnose, prescribe, or give medical advice."
        </p>
      </div>

      <div>
        <h3 className="label-text mb-4">Use Often</h3>
        <div className="flex-col gap-2">
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-muted-sage)', display: 'inline-block', width: 'fit-content' }}>missed-call recovery</div>
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-muted-sage)', display: 'inline-block', width: 'fit-content' }}>booking support</div>
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-muted-sage)', display: 'inline-block', width: 'fit-content' }}>patient communication</div>
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-muted-sage)', display: 'inline-block', width: 'fit-content' }}>front-desk support</div>
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-muted-sage)', display: 'inline-block', width: 'fit-content' }}>after-hours capture</div>
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-muted-sage)', display: 'inline-block', width: 'fit-content' }}>protects patient opportunities</div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="label-text mb-4" style={{ color: 'var(--color-soft-amber)' }}>Avoid</h3>
        <div className="flex-col gap-2">
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-soft-amber)', display: 'inline-block', width: 'fit-content' }}>AI receptionist</div>
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-soft-amber)', display: 'inline-block', width: 'fit-content' }}>AI bot / chatbot</div>
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-soft-amber)', display: 'inline-block', width: 'fit-content' }}>receptionist replacement</div>
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-soft-amber)', display: 'inline-block', width: 'fit-content' }}>guaranteed bookings</div>
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-soft-amber)', display: 'inline-block', width: 'fit-content' }}>HIPAA-proof</div>
          <div className="highlight" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-soft-amber)', display: 'inline-block', width: 'fit-content' }}>your receptionist is failing</div>
        </div>
      </div>
    </div>
  );
};

export default PositioningSafetyView;
