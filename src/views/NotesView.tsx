import React, { useEffect, useMemo, useRef, useState } from 'react';
import { checkGuardrails } from '../utils/languageGuardrails';
import type { NoteContext, Workspace } from '../types/app';
import { loadNotesDraft, saveNotesDraft } from '../utils/notesStorage';
import { buildNoteParagraph } from '../utils/notesOutput';

interface NotesViewProps {
  initialContext?: NoteContext;
  workspace?: Workspace;
  isSidePanel?: boolean;
}
const MEDSPA_CONTEXTS: NoteContext[] = ['gatekeeper', 'owner', 'fit_call', 'demo', 'email', 'ig'];
const PARTNER_CONTEXTS: NoteContext[] = ['partner'];

function getDefaultContext(workspace: Workspace, initialContext: NoteContext): NoteContext {
  if (workspace === 'partner') {
    return 'partner';
  }

  return initialContext === 'partner' ? 'gatekeeper' : initialContext;
}

const NotesView: React.FC<NotesViewProps> = ({ initialContext = 'gatekeeper', workspace = 'medspa', isSidePanel = false }) => {
  const [context, setContext] = useState<NoteContext>(getDefaultContext(workspace, initialContext));
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [copyStatus, setCopyStatus] = useState('');
  const [guardrailWarnings, setGuardrailWarnings] = useState<string[]>([]);
  const [storageMessage, setStorageMessage] = useState('');
  const hydratedRef = useRef(false);

  const availableContexts = useMemo(
    () => (workspace === 'partner' ? PARTNER_CONTEXTS : MEDSPA_CONTEXTS),
    [workspace]
  );

  useEffect(() => {
    const nextContext = getDefaultContext(workspace, initialContext);
    if (!availableContexts.includes(nextContext)) {
      setContext(availableContexts[0]);
      return;
    }

    setContext(nextContext);
  }, [availableContexts, initialContext, workspace]);

  useEffect(() => {
    hydratedRef.current = false;
    setGuardrailWarnings([]);
    setCopyStatus('');

    try {
      setFormData(loadNotesDraft(window.localStorage, workspace, context));
      setStorageMessage('');
    } catch {
      setFormData({});
      setStorageMessage('Note not saved locally. Copy it before leaving.');
    } finally {
      hydratedRef.current = true;
    }
  }, [context, workspace]);

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    try {
      saveNotesDraft(window.localStorage, workspace, context, formData);
      setStorageMessage('');
    } catch {
      setStorageMessage('Note not saved locally. Copy it before leaving.');
    }
  }, [context, formData, workspace]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getFields = () => {
    switch (context) {
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

  const currentFields = getFields();

  const generatedText = useMemo(() => {
    return buildNoteParagraph(context, currentFields, formData, new Date().toLocaleDateString());
  }, [context, currentFields, formData]);

  const handleCopy = async () => {
    const warnings = checkGuardrails(generatedText, workspace === 'partner');
    setGuardrailWarnings(warnings);

    try {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        throw new Error('Clipboard unavailable');
      }

      await navigator.clipboard.writeText(generatedText);
      setCopyStatus(warnings.length > 0 ? 'Copied (with warnings)' : 'Copied clean!');
    } catch {
      setCopyStatus('Copy manually from the text below.');
    }

    window.setTimeout(() => setCopyStatus(''), 3000);
  };

  const handleClear = () => {
    setFormData({});
    setGuardrailWarnings([]);
    setCopyStatus('');
  };

  return (
    <div className={`flex-col ${!isSidePanel ? 'desktop-notes-layout' : ''}`} style={{ padding: '24px 16px', gap: '24px', height: '100%', overflowY: 'auto' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>
          Quick Notes
        </h2>
        <p className="body-text" style={{ color: 'var(--color-muted-sage)', fontSize: '13px' }}>
          Local scratchpad. Copy output to your external sheet.
        </p>
      </div>

      {storageMessage && (
        <div style={{ backgroundColor: '#FDECEA', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #E57373' }}>
          <p style={{ fontSize: '14px', color: '#D32F2F', fontWeight: 600 }}>{storageMessage}</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: isSidePanel ? 'column' : 'row', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
        {isSidePanel ? (
          <select 
            value={context} 
            onChange={(e) => setContext(e.target.value as NoteContext)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-light-gray)' }}
          >
            {availableContexts.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        ) : (
          availableContexts.map((ctx) => (
            <button
              key={ctx}
              className={`btn ${context === ctx ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: '12px', whiteSpace: 'nowrap' }}
              onClick={() => setContext(ctx)}
            >
              {ctx}
            </button>
          ))
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: isSidePanel ? 'column' : 'row', gap: '24px', flex: 1 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          {currentFields.map((field) => (
            <div key={field.name}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-deep-charcoal)' }}>
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(event) => handleInputChange(field.name, event.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}
                >
                  <option value="">-- Select --</option>
                  {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : field.type === 'date' ? (
                <input
                  type="date"
                  value={formData[field.name] || ''}
                  onChange={(event) => handleInputChange(field.name, event.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}
                />
              ) : (
                <input
                  type="text"
                  value={formData[field.name] || ''}
                  onChange={(event) => handleInputChange(field.name, event.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}
                />
              )}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {guardrailWarnings.length > 0 && (
            <div style={{ backgroundColor: '#FDECEA', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #E57373' }}>
              <h4 style={{ color: '#D32F2F', fontWeight: 600, marginBottom: '8px' }}>Language Guardrail Warning</h4>
              <p style={{ fontSize: '14px', color: '#D32F2F', marginBottom: '8px' }}>Your note contains forbidden or risky words:</p>
              <ul style={{ fontSize: '14px', color: '#D32F2F', paddingLeft: '20px' }}>
                {guardrailWarnings.map((warning, index) => <li key={index}>{warning}</li>)}
              </ul>
              <p style={{ fontSize: '12px', color: '#D32F2F', marginTop: '8px', fontStyle: 'italic' }}>
                Please rewrite these terms before pasting into any client-facing system or official sheet if they are visible to others.
              </p>
            </div>
          )}

          <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-accent-amber)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '8px' }}>Generated Note Output</h3>
            <textarea
              readOnly
              value={generatedText || 'Start typing above to generate your note...'}
              style={{
                width: '100%',
                minHeight: '100px',
                fontSize: '14px',
                color: 'var(--color-slate-grey)',
                lineHeight: 1.5,
                backgroundColor: '#fff',
                padding: '12px',
                borderRadius: '8px',
                border: '1px dashed var(--color-border)',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />

            {copyStatus && (
              <p style={{ fontSize: '12px', color: 'var(--color-deep-charcoal)', marginTop: '8px' }}>{copyStatus}</p>
            )}

            <div className="flex gap-2" style={{ marginTop: '16px' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => void handleCopy()}>
                Copy Paragraph
              </button>
              <button className="btn btn-secondary" style={{ padding: '12px' }} onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesView;
