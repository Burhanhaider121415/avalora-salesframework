import React, { useState } from 'react';

interface LiveViewProps {
  workspace: 'medspa' | 'partner';
  scenario: string | null;
  onReset: () => void;
}

// Placeholder Data Structure (from requirements)
const placeholderData = {
  medspa: {
    call_medspa: {
      stage: 'gatekeeper',
      goal: 'Transfer to owner/manager or get name/email/callback.',
      sayThis: "Hi, this is Burhan with Avalora. Maybe you can help me for a moment.\n\nI am calling about patient inquiry flow and missed booking inquiries for [Clinic Name] - not anything clinical and not a patient issue.\n\nWho usually handles that side of the clinic: the owner, practice manager, or office manager?",
      branchButtons: [
        { id: 'transfer', label: 'Owner Available / Transfer' },
        { id: 'busy', label: 'Owner is Busy' },
        { id: 'send_info', label: 'Send Info' },
        { id: 'what_is_this', label: 'What is this about?' },
        { id: 'is_sales', label: 'Is this a sales call?' }
      ]
    }
  },
  partner: {
    call_partner: {
      stage: 'gatekeeper',
      goal: 'Get to decision-maker or get best way to send short demo.',
      sayThis: "Hey, maybe you can help me out for a second.\n\nI'm trying to reach [Name]. This is Burhan with Avalora.\n\nIt's not a patient call or anything urgent. I'm reaching out because we're building a small referral partner circle around Miami med spas and aesthetic clinics, and I wanted to get a short demo in front of [Name] to see if it's relevant to their network.",
      branchButtons: [
        { id: 'transfer', label: 'Transfer / Available' },
        { id: 'what_regarding', label: 'What is this regarding?' },
        { id: 'is_sales', label: 'Is this a sales call?' },
        { id: 'send_info', label: 'Send Information' }
      ]
    }
  }
};

const LiveView: React.FC<LiveViewProps> = ({ workspace, scenario, onReset }) => {
  const [currentStepId, setCurrentStepId] = useState('initial');
  
  if (!scenario) {
    return (
      <div className="flex-col items-center justify-center h-full gap-4 mt-8">
        <p style={{ color: 'var(--color-muted-sage)' }}>No active scenario selected.</p>
        <button className="btn btn-secondary" onClick={onReset} style={{ width: 'auto' }}>Go to Start</button>
      </div>
    );
  }

  // Use placeholder data if available, else generic placeholder
  const data = (placeholderData as any)[workspace]?.[scenario] || {
    goal: 'Complete the objective',
    sayThis: 'This is a placeholder script. Real content will be loaded in Phase 4.',
    branchButtons: [
      { id: 'next', label: 'Continue to next step' },
      { id: 'objection', label: 'Handle Objection' }
    ]
  };

  const isMedSpa = workspace === 'medspa';
  const accentClass = isMedSpa ? 'btn-accent-amber' : 'btn-accent-sage';

  return (
    <div className="flex-col h-full">
      <div className="mb-4">
        <span className="label-text">Goal: {data.goal}</span>
      </div>

      <div className="card mb-6" style={{ minHeight: '200px' }}>
        <p className="script-text" style={{ whiteSpace: 'pre-wrap' }}>
          {data.sayThis}
        </p>
      </div>

      <div className="flex-col gap-4 mt-auto pb-4">
        <h3 className="label-text">What happened?</h3>
        {data.branchButtons.map((btn: any) => (
          <button key={btn.id} className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '0 24px' }}>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LiveView;
