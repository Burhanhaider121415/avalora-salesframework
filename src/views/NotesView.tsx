import React, { useState, useEffect } from 'react';
import { checkGuardrails } from '../utils/languageGuardrails';

type NoteContext = 'gatekeeper' | 'owner' | 'fit_call' | 'demo' | 'email' | 'ig' | 'partner';

interface NotesViewProps {
  initialContext?: NoteContext;
  workspace?: 'medspa' | 'partner';
}

const NotesView: React.FC<NotesViewProps> = ({ initialContext = 'gatekeeper', workspace = 'medspa' }) => {
  const [context, setContext] = useState<NoteContext>(initialContext);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [copyStatus, setCopyStatus] = useState('');
  const [guardrailWarnings, setGuardrailWarnings] = useState<string[]>([]);

  useEffect(() => {
    // Reset form when context changes
    setFormData({});
    setGuardrailWarnings([]);
    setCopyStatus('');
  }, [context]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFields = () => {
    switch(context) {
      case 'gatekeeper':
        return [
          { name: 'clinicName', label: 'Clinic Name' },
          { name: 'whoAnswered', label: 'Who Answered / Receptionist Name' },
          { name: 'attitude', label: 'Attitude (Helpful / Neutral / Blocking)', type: 'select', options: ['Helpful', 'Neutral', 'Blocking'] },
          { name: 'rightPerson', label: 'Right Person Name & Title' },
          { name: 'directEmail', label: 'Direct Email' },
          { name: 'demoPermission', label: 'Permission to send short demo?', type: 'select', options: ['Yes', 'No'] },
          { name: 'mainObjection', label: 'Main Objection' },
          { name: 'nextAction', label: 'Next Action' },
          { name: 'followUpDate', label: 'Follow-up Date', type: 'date' },
        ];
      case 'owner':
        return [
          { name: 'ownerName', label: 'Owner/Operator Name' },
          { name: 'personalization', label: 'Personalization Used' },
          { name: 'painSignal', label: 'Main Pain Signal' },
          { name: 'angleUsed', label: 'Angle Used' },
          { name: 'objection', label: 'Objection' },
          { name: 'demoSent', label: 'Demo Sent?', type: 'select', options: ['Yes', 'No'] },
          { name: 'fitCallBooked', label: 'Fit Call Booked?', type: 'select', options: ['Yes', 'No'] },
          { name: 'nextStep', label: 'Next Step' },
          { name: 'followUpTime', label: 'Follow-up Time', type: 'date' },
        ];
      case 'fit_call':
        return [
          { name: 'whyNow', label: 'Why Now?' },
          { name: 'frontDeskIssue', label: 'Front Desk Bottleneck' },
          { name: 'afterHoursIssue', label: 'After-Hours Issue' },
          { name: 'bilingualNeed', label: 'Bilingual Need' },
          { name: 'bookingSystem', label: 'Booking/CRM System' },
          { name: 'goodFit', label: 'Fit Quality', type: 'select', options: ['Good Fit', 'Weak Fit'] },
          { name: 'demoBooked', label: 'Sales/Demo Zoom Booked?', type: 'select', options: ['Yes', 'No'] },
        ];
      case 'demo':
        return [
          { name: 'exactPain', label: 'Exact Pain from Fit Call' },
          { name: 'demoScenario', label: 'Demo Scenario Used' },
          { name: 'revenueLeak', label: 'Revenue Leak Estimate' },
          { name: 'safetyConcern', label: 'Safety Concern' },
          { name: 'bookingMode', label: 'Booking Mode', type: 'select', options: ['Direct Booking', 'Summary Mode'] },
          { name: 'packageRecommended', label: 'Package Recommended' },
          { name: 'objections', label: 'Objections' },
          { name: 'verbalYes', label: 'Verbal Yes?', type: 'select', options: ['Yes', 'No'] },
          { name: 'activationSent', label: 'Activation Packet Sent?', type: 'select', options: ['Yes', 'No'] },
        ];
      case 'email':
        return [
          { name: 'clinicName', label: 'Clinic Name' },
          { name: 'researchAngle', label: 'Research Angle' },
          { name: 'emailScenario', label: 'Email Scenario' },
          { name: 'subjectLine', label: 'Subject Line Used' },
          { name: 'replyType', label: 'Reply Type' },
          { name: 'nextFollowUp', label: 'Next Follow-up', type: 'date' },
        ];
      case 'ig':
        return [
          { name: 'clinicName', label: 'Clinic Name' },
          { name: 'igHandle', label: 'IG Handle' },
          { name: 'fitScore', label: 'Fit Score (1-10)' },
          { name: 'dmFamily', label: 'DM Family Used' },
          { name: 'engagementDone', label: 'Engagement Done?', type: 'select', options: ['Yes', 'No'] },
          { name: 'replyType', label: 'Reply Type' },
          { name: 'demoPermission', label: 'Demo Permission?', type: 'select', options: ['Yes', 'No'] },
          { name: 'nextAction', label: 'Next Action' },
        ];
      case 'partner':
        return [
          { name: 'partnerName', label: 'Partner Name' },
          { name: 'company', label: 'Company' },
          { name: 'medSpaAccess', label: 'Med Spa Access Level' },
          { name: 'trustLevel', label: 'Trust Level (1-10)' },
          { name: 'demoSent', label: 'Demo Sent?', type: 'select', options: ['Yes', 'No'] },
          { name: 'thankYouDiscussed', label: 'Partner Thank-You Discussed?', type: 'select', options: ['Yes', 'No'] },
          { name: 'nextAction', label: 'Next Action' },
          { name: 'followUpDate', label: 'Follow-up Date', type: 'date' },
        ];
      default:
        return [];
    }
  };

  const generateParagraph = () => {
    const fields = getFields();
    let paragraph = `${new Date().toLocaleDateString()} — Context: ${context.toUpperCase().replace('_', ' ')}. `;
    
    fields.forEach(f => {
      const val = formData[f.name];
      if (val) {
        paragraph += `${f.label}: ${val}. `;
      }
    });

    return paragraph.trim();
  };

  const handleCopy = () => {
    const text = generateParagraph();
    
    // Check guardrails
    const warnings = checkGuardrails(text, workspace === 'partner');
    setGuardrailWarnings(warnings);

    if (warnings.length > 0) {
      setCopyStatus('Copied (with warnings)');
    } else {
      setCopyStatus('Copied clean!');
    }

    navigator.clipboard.writeText(text);
    setTimeout(() => setCopyStatus(''), 3000);
  };

  const handleClear = () => {
    setFormData({});
    setGuardrailWarnings([]);
    setCopyStatus('');
  };

  const currentFields = getFields();

  return (
    <div className="flex-col" style={{ padding: '24px 16px', gap: '24px', paddingBottom: '100px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>
          Situation Notes
        </h2>
        <p className="body-text" style={{ color: 'var(--color-slate-grey)' }}>
          Quick structured capture. Copy to your Google Sheet tracker.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
        {(['gatekeeper', 'owner', 'fit_call', 'demo', 'email', 'ig', 'partner'] as NoteContext[]).map(ctx => (
          <button 
            key={ctx}
            className={`btn ${context === ctx ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 12px', fontSize: '12px', whiteSpace: 'nowrap' }}
            onClick={() => setContext(ctx)}
          >
            {ctx.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentFields.map(f => (
          <div key={f.name}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-deep-charcoal)' }}>
              {f.label}
            </label>
            {f.type === 'select' ? (
              <select 
                value={formData[f.name] || ''} 
                onChange={(e) => handleInputChange(f.name, e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}
              >
                <option value="">-- Select --</option>
                {f.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : f.type === 'date' ? (
              <input 
                type="date"
                value={formData[f.name] || ''} 
                onChange={(e) => handleInputChange(f.name, e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}
              />
            ) : (
              <input 
                type="text"
                value={formData[f.name] || ''} 
                onChange={(e) => handleInputChange(f.name, e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}
              />
            )}
          </div>
        ))}
      </div>

      {guardrailWarnings.length > 0 && (
        <div style={{ backgroundColor: '#FDECEA', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #E57373' }}>
          <h4 style={{ color: '#D32F2F', fontWeight: 600, marginBottom: '8px' }}>⚠️ Language Guardrail Warning</h4>
          <p style={{ fontSize: '14px', color: '#D32F2F', marginBottom: '8px' }}>Your note contains forbidden or risky words:</p>
          <ul style={{ fontSize: '14px', color: '#D32F2F', paddingLeft: '20px' }}>
            {guardrailWarnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
          <p style={{ fontSize: '12px', color: '#D32F2F', marginTop: '8px', fontStyle: 'italic' }}>Please rewrite these terms before pasting into the client-facing CRM or official sheets if they are visible to others.</p>
        </div>
      )}

      <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-accent-amber)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>Generated Note Output</h3>
        <p style={{ fontSize: '14px', color: 'var(--color-slate-grey)', lineHeight: 1.5, minHeight: '60px', backgroundColor: '#fff', padding: '12px', borderRadius: '8px', border: '1px dashed var(--color-border)' }}>
          {generateParagraph() || "Start typing above to generate your note..."}
        </p>

        <div className="flex gap-2" style={{ marginTop: '16px' }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleCopy}>
            {copyStatus ? copyStatus : 'Copy Paragraph'}
          </button>
          <button className="btn btn-secondary" style={{ padding: '12px' }} onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

    </div>
  );
};

export default NotesView;
