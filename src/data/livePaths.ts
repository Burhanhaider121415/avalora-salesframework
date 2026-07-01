export type ActionTarget = 'next' | 'back' | string; // string is node id

export interface PathNode {
  id: string;
  stage: string;
  goal: string;
  useWhen?: string;
  sayThis?: string;
  whyItWorks?: string;
  showFollowUp?: string;
  avoid?: string;
  nextStep?: string;
  branchButtons: { id: string; label: string; target: ActionTarget }[];
}

export interface LivePath {
  id: string;
  name: string;
  workspace: 'medspa' | 'partner';
  nodes: Record<string, PathNode>;
  initialNode: string;
  isLinearStepper?: boolean;
}

export const livePaths: Record<string, LivePath> = {
  // 2. MED SPA OWNER — RECEPTIONIST / GATEKEEPER LIVE PATH
  medspa_gatekeeper: {
    id: 'medspa_gatekeeper',
    name: 'Receptionist / Gatekeeper',
    workspace: 'medspa',
    initialNode: 'opener',
    nodes: {
      opener: {
        id: 'opener',
        stage: 'Gatekeeper Opening',
        goal: 'Get routed to the owner/operator or capture the correct person, callback time, and direct email.',
        useWhen: 'When the front desk or a receptionist answers.',
        sayThis: "Hi, this is [Name] with Avalora. Maybe you can help me for a moment.\n\nI am calling about patient inquiry flow and missed booking inquiries for [Clinic Name] - not anything clinical and not a patient issue.\n\nWho usually handles that side of the clinic: the owner, practice manager, or office manager?",
        branchButtons: [
          { id: 'transfer', label: 'If they transfer you', target: 'transfer' },
          { id: 'what_is_this', label: 'What is this regarding?', target: 'what_is_this' },
          { id: 'is_sales', label: 'Is this a sales call?', target: 'is_sales' },
          { id: 'already_have', label: 'We already have a receptionist', target: 'already_have' },
          { id: 'busy', label: 'Owner/manager busy', target: 'busy' },
          { id: 'not_interested', label: 'Not interested', target: 'not_interested' }
        ]
      },
      what_is_this: {
        id: 'what_is_this',
        stage: 'Gatekeeper Objection',
        goal: 'Clarify without pitching.',
        sayThis: "It's regarding the system for handling after-hours inquiries and missed calls from new patients. I need to leave a brief note or schedule a callback with the person managing patient acquisition.",
        branchButtons: [
          { id: 'transfer', label: 'They transfer', target: 'transfer' },
          { id: 'busy', label: 'Owner is busy', target: 'busy' },
          { id: 'send_info', label: 'Send info', target: 'send_info' }
        ]
      },
      is_sales: {
        id: 'is_sales',
        stage: 'Gatekeeper Objection',
        goal: 'Disarm and pivot.',
        sayThis: "Well, we do provide patient protection systems, but right now I don't even know if you're losing any patients to missed calls. I just wanted to leave a quick note for the owner to see if it's worth a 5-minute chat later.",
        branchButtons: [
          { id: 'busy', label: 'Owner is busy', target: 'busy' },
          { id: 'send_info', label: 'Send info', target: 'send_info' },
          { id: 'not_interested', label: 'Not interested', target: 'not_interested' }
        ]
      },
      already_have: {
        id: 'already_have',
        stage: 'Gatekeeper Objection',
        goal: 'Validate and pivot to overflow.',
        sayThis: "That's great you have someone dedicated. We actually just handle the overflow—when they are on the other line, busy with a patient in the clinic, or after hours. Who would I speak to about the overflow specifically?",
        branchButtons: [
          { id: 'busy', label: 'Owner is busy', target: 'busy' },
          { id: 'send_info', label: 'Send info', target: 'send_info' }
        ]
      },
      busy: {
        id: 'busy',
        stage: 'Routing Ladder',
        goal: 'Capture data before ending.',
        sayThis: "No problem, I don't want to interrupt them. What is the best time to try back?\n\nAlso, just in case I miss them again, what is their direct email so I can send a quick summary of why I called?",
        branchButtons: [
          { id: 'data_captured', label: 'Got Info / Data Capture', target: 'data_capture' },
          { id: 'send_info', label: 'Just send an email to info@', target: 'send_info' }
        ]
      },
      send_info: {
        id: 'send_info',
        stage: 'Fallback',
        goal: 'Get permission and name.',
        sayThis: "I can do that. Just so I can put it to the right person's attention, what is the owner or manager's name?",
        branchButtons: [
          { id: 'done', label: 'Got it / End Call', target: 'disposition' }
        ]
      },
      not_interested: {
        id: 'not_interested',
        stage: 'Rejection',
        goal: 'Polite exit.',
        sayThis: "Understood, thank you for your time.",
        branchButtons: [
          { id: 'done', label: 'End Call', target: 'disposition' }
        ]
      },
      transfer: {
        id: 'transfer',
        stage: 'Transferring',
        goal: 'Prepare for Owner/Operator.',
        sayThis: "Thank you. (Wait for transfer)",
        branchButtons: [
          { id: 'owner_answers', label: 'Owner Answers', target: 'owner_answers_placeholder' },
          { id: 'voicemail', label: 'Voicemail', target: 'voicemail' }
        ]
      },
      owner_answers_placeholder: {
        id: 'owner_answers_placeholder',
        stage: 'Connected',
        goal: 'Switch to Owner Path',
        sayThis: "--> Switch to Owner/Operator Cold Call Path <--",
        branchButtons: [
          { id: 'disposition', label: 'End / Disposition', target: 'disposition' }
        ]
      },
      voicemail: {
        id: 'voicemail',
        stage: 'Voicemail',
        goal: 'Leave a brief message.',
        sayThis: "Hi [Name], this is [Name] with Avalora. Calling regarding missed patient inquiries. I'll send you a brief email. My number is [Number].",
        branchButtons: [
          { id: 'disposition', label: 'End / Disposition', target: 'disposition' }
        ]
      },
      data_capture: {
        id: 'data_capture',
        stage: 'Data Capture',
        goal: 'Confirm details.',
        sayThis: "[Note: Capture Name, Email, Callback Time in Notes]",
        branchButtons: [
          { id: 'pricing_questions', label: 'Pricing / AI / Safety questions?', target: 'pricing_questions' },
          { id: 'disposition', label: 'End / Disposition', target: 'disposition' }
        ]
      },
      pricing_questions: {
        id: 'pricing_questions',
        stage: 'Questions',
        goal: 'Defer to owner.',
        sayThis: "I'd love to go over the specifics, but that's really best discussed with the owner to see if there's even a fit first. I'll reach out to them at the time you suggested.",
        branchButtons: [
          { id: 'disposition', label: 'End / Disposition', target: 'disposition' }
        ]
      },
      disposition: {
        id: 'disposition',
        stage: 'Disposition',
        goal: 'Log the call.',
        sayThis: "Log the call outcome in Quick Notes, then copy the clean summary into the Google Sheet tracker.",
        branchButtons: []
      }
    }
  },

  // 3 & 4. MED SPA OWNER — OWNER / OPERATOR COLD CALL LIVE PATH
  medspa_owner: {
    id: 'medspa_owner',
    name: 'Owner / Operator Cold Call',
    workspace: 'medspa',
    initialNode: 'opener',
    nodes: {
      opener: {
        id: 'opener',
        stage: 'Owner Opening',
        goal: 'Permission to speak.',
        sayThis: "Hi [Name], this is [Your Name] with Avalora. I know I'm catching you in the middle of your day—do you have 30 seconds for me to tell you why I'm calling, and you can let me know if we should keep talking?",
        branchButtons: [
          { id: 'early_pushback', label: 'Early pushback', target: 'early_pushback' },
          { id: 'yes', label: 'Yes / Go ahead', target: 'personalization' }
        ]
      },
      early_pushback: {
        id: 'early_pushback',
        stage: 'Owner Pushback',
        goal: 'Polite persistence.',
        sayThis: "I completely understand you're busy. I'll be very brief...",
        branchButtons: [
          { id: 'continue', label: 'Continue', target: 'personalization' },
          { id: 'hangup', label: 'Hang up', target: 'disposition' }
        ]
      },
      personalization: {
        id: 'personalization',
        stage: 'Personalization Insert',
        goal: 'Show you did your research.',
        sayThis: "I was looking at your clinic, [Clinic Name], and noticed [Insert personalized observation from research].",
        branchButtons: [
          { id: 'choose_angle', label: 'Choose Call Angle', target: 'choose_angle' }
        ]
      },
      choose_angle: {
        id: 'choose_angle',
        stage: '20-Second Angle Selector',
        goal: 'Select the most relevant problem.',
        sayThis: "Select the angle for this call:",
        branchButtons: [
          { id: 'missed_call', label: 'Missed-call recovery', target: 'angle_missed_call' },
          { id: 'speed_to_lead', label: 'Speed-to-lead', target: 'angle_speed' },
          { id: 'after_hours', label: 'After-hours capture', target: 'angle_after_hours' },
          { id: 'marketing_roi', label: 'Marketing ROI protection', target: 'angle_roi' },
          { id: 'front_desk', label: 'Front-desk overflow', target: 'angle_front_desk' },
          { id: 'bilingual', label: 'Bilingual Miami angle', target: 'angle_bilingual' }
        ]
      },
      angle_missed_call: {
        id: 'angle_missed_call',
        stage: 'Pitch: Missed Calls',
        goal: 'Highlight missed calls.',
        sayThis: "The reason I'm calling is we help med spas like yours capture every single missed call and turn those un-answered inquiries into booked consultations, without adding more work to your front desk.",
        branchButtons: [{ id: 'diagnostic', label: 'Diagnostic', target: 'short_diagnostic' }]
      },
      angle_speed: {
        id: 'angle_speed',
        stage: 'Pitch: Speed-to-lead',
        goal: 'Highlight speed.',
        sayThis: "The reason I'm calling is we help clinics respond to every new patient inquiry instantly, 24/7, preventing them from calling the clinic down the street.",
        branchButtons: [{ id: 'diagnostic', label: 'Diagnostic', target: 'short_diagnostic' }]
      },
      angle_after_hours: {
        id: 'angle_after_hours',
        stage: 'Pitch: After-hours',
        goal: 'Highlight after-hours.',
        sayThis: "The reason I'm calling is we help clinics book patients even when you're closed, turning your after-hours traffic into scheduled consultations.",
        branchButtons: [{ id: 'diagnostic', label: 'Diagnostic', target: 'short_diagnostic' }]
      },
      angle_roi: {
        id: 'angle_roi',
        stage: 'Pitch: Marketing ROI',
        goal: 'Highlight ROI.',
        sayThis: "The reason I'm calling is we help clinics protect their marketing spend by ensuring every lead generated gets an immediate response, maximizing your ROI.",
        branchButtons: [{ id: 'diagnostic', label: 'Diagnostic', target: 'short_diagnostic' }]
      },
      angle_front_desk: {
        id: 'angle_front_desk',
        stage: 'Pitch: Front-desk overflow',
        goal: 'Highlight front desk help.',
        sayThis: "The reason I'm calling is we give your front desk a safety net, handling the overflow calls when they are busy with patients in the clinic so you never miss a new booking.",
        branchButtons: [{ id: 'diagnostic', label: 'Diagnostic', target: 'short_diagnostic' }]
      },
      angle_bilingual: {
        id: 'angle_bilingual',
        stage: 'Pitch: Bilingual',
        goal: 'Highlight Spanish/English.',
        sayThis: "The reason I'm calling is we help Miami clinics instantly handle new patient inquiries in both perfect English and Spanish, so you don't lose revenue due to language barriers.",
        branchButtons: [{ id: 'diagnostic', label: 'Diagnostic', target: 'short_diagnostic' }]
      },
      short_diagnostic: {
        id: 'short_diagnostic',
        stage: 'Soft Diagnostic',
        goal: 'Ask a non-threatening question.',
        sayThis: "Just out of curiosity, when a new patient calls and your front desk is busy with someone in the clinic, what currently happens to that call?",
        branchButtons: [
          { id: 'buying_signals', label: 'They share the problem (Buying Signal)', target: 'demo_close' },
          { id: 'owner_objections', label: 'Objection / We are fine', target: 'owner_objections' },
          { id: 'pricing_ref', label: 'How much is it?', target: 'pricing_reference' }
        ]
      },
      owner_objections: {
        id: 'owner_objections',
        stage: 'Owner Objections',
        goal: 'Handle common pushbacks.',
        sayThis: "Use the matching objection response from Search or the Full Framework before continuing. Do not improvise pricing, compliance claims, or replacement language.",
        branchButtons: [
          { id: 'demo_close', label: 'Pivot to Demo Close', target: 'demo_close' },
          { id: 'fit_call', label: 'Pivot to Fit Call', target: 'fit_call_close' },
          { id: 'disposition', label: 'End Call', target: 'disposition' }
        ]
      },
      pricing_reference: {
        id: 'pricing_reference',
        stage: 'Pricing Question',
        goal: 'Provide range, defer to fit.',
        sayThis: "It depends on call volume, but packages start at $299/mo up to $1,299/mo for very high volume. But I'd rather see if it even makes sense for your workflow first.",
        branchButtons: [
          { id: 'demo_close', label: 'Demo Close', target: 'demo_close' }
        ]
      },
      demo_close: {
        id: 'demo_close',
        stage: 'Demo Close',
        goal: 'Get them to agree to a demo.',
        sayThis: "Based on what you're saying, I think there's a lot of alignment here. The best next step is for me to send you a 3-minute interactive demo you can try on your own phone. If you like it, we can schedule a quick 15-minute fit call. Where is the best email to send that to?",
        branchButtons: [
          { id: 'send_demo', label: 'Send demo + follow-up', target: 'send_demo' },
          { id: 'fit_call', label: 'Skip to Fit Call scheduling', target: 'fit_call_close' }
        ]
      },
      send_demo: {
        id: 'send_demo',
        stage: 'Send Demo',
        goal: 'Confirm email and set follow-up.',
        sayThis: "Great, I'll send that over. I'll follow up on [Day] to see what you thought.",
        branchButtons: [
          { id: 'disposition', label: 'End Call', target: 'disposition' }
        ]
      },
      fit_call_close: {
        id: 'fit_call_close',
        stage: 'Fit Call Close',
        goal: 'Schedule the 15-min call.',
        sayThis: "Why don't we carve out 15 minutes next week? We can do a quick fit call to see if this actually makes sense for your clinic. Does Tuesday or Wednesday work better?",
        branchButtons: [
          { id: 'schedule', label: 'Scheduling + Next Step', target: 'schedule' }
        ]
      },
      schedule: {
        id: 'schedule',
        stage: 'Scheduling',
        goal: 'Lock in calendar.',
        sayThis: "Confirm the time, confirm the email for the invite, and log the next step in Notes before ending the call.",
        branchButtons: [
          { id: 'disposition', label: 'End Call', target: 'disposition' }
        ]
      },
      disposition: {
        id: 'disposition',
        stage: 'Disposition',
        goal: 'Log the call.',
        sayThis: "Log the call outcome in Quick Notes, then copy the clean summary into the Google Sheet tracker.",
        branchButtons: []
      }
    }
  },

  // 7. REFERRAL PARTNER GATEKEEPER LIVE PATH
  partner_gatekeeper: {
    id: 'partner_gatekeeper',
    name: 'Referral Partner Gatekeeper',
    workspace: 'partner',
    initialNode: 'opener',
    nodes: {
      opener: {
        id: 'opener',
        stage: 'Gatekeeper',
        goal: 'Get to decision-maker or get best way to send short demo.',
        sayThis: "Hey, maybe you can help me out for a second.\n\nI'm trying to reach [Name]. This is [Your Name] with Avalora.\n\nIt's not a client issue or anything urgent. I'm reaching out because we're building a small referral partner circle around Miami aesthetics, and I wanted to get a short demo in front of [Name] to see if it's relevant to their agency.",
        branchButtons: [
          { id: 'transfer', label: 'Transfer / Available', target: 'transfer' },
          { id: 'what_regarding', label: 'What is this regarding?', target: 'what_regarding' },
          { id: 'is_sales', label: 'Is this a sales call?', target: 'is_sales' },
          { id: 'send_info', label: 'Send Information / Not available', target: 'send_info' }
        ]
      },
      transfer: {
        id: 'transfer',
        stage: 'Transfer',
        sayThis: "Thank you. (Wait for transfer)",
        goal: 'Prepare for Partner.',
        branchButtons: [{ id: 'partner_answers', label: 'Partner Answers', target: 'partner_answers' }]
      },
      partner_answers: {
        id: 'partner_answers',
        stage: 'Connected',
        goal: 'Switch to Partner Path',
        sayThis: "--> Switch to Referral Partner Live Call Path <--",
        branchButtons: [{ id: 'end', label: 'End', target: 'end' }]
      },
      what_regarding: {
        id: 'what_regarding',
        stage: 'Gatekeeper Objection',
        goal: 'Clarify',
        sayThis: "It's regarding a potential partnership. We help their med spa clients with missed calls, and we have a referral program they might be interested in.",
        branchButtons: [
          { id: 'transfer', label: 'Transfer', target: 'transfer' },
          { id: 'send_info', label: 'Send Info', target: 'send_info' }
        ]
      },
      is_sales: {
        id: 'is_sales',
        stage: 'Gatekeeper Objection',
        goal: 'Disarm',
        sayThis: "No, I'm not trying to sell your agency anything. I'm looking to partner with you to offer our system to your med spa clients.",
        branchButtons: [
          { id: 'transfer', label: 'Transfer', target: 'transfer' },
          { id: 'send_info', label: 'Send Info', target: 'send_info' }
        ]
      },
      send_info: {
        id: 'send_info',
        stage: 'Fallback',
        goal: 'Get email',
        sayThis: "No problem. What is the best email to send a quick overview to [Name]?",
        branchButtons: [{ id: 'end', label: 'End', target: 'end' }]
      },
      end: {
        id: 'end',
        stage: 'Disposition',
        goal: 'Log',
        sayThis: "Log the call outcome in partner notes, then copy the clean summary into the Google Sheet tracker.",
        branchButtons: []
      }
    }
  },

  // 5. FIT CALL STEP MODE
  fit_call: {
    id: 'fit_call',
    name: '15-Minute Fit Call',
    workspace: 'medspa',
    initialNode: 'step1',
    isLinearStepper: true,
    nodes: {
      step1: { id: 'step1', stage: 'Step 1 of 12', goal: 'Purpose of this call', sayThis: "Determine if there is a mutual fit. DO NOT explain the whole product here. Make the owner feel understood.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }] },
      step2: { id: 'step2', stage: 'Step 2 of 12', goal: 'Before the call checklist', sayThis: "Review clinic website, understand their services, check their social media presence.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step3: { id: 'step3', stage: 'Step 3 of 12', goal: '10–15 minute timing', sayThis: "Acknowledge the time limit up front to respect their schedule.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step4: { id: 'step4', stage: 'Step 4 of 12', goal: 'Opening', sayThis: "\"Thanks for jumping on. I know we only have 15 minutes, so I want to keep this focused.\"", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step5: { id: 'step5', stage: 'Step 5 of 12', goal: 'Light Avalora intro', sayThis: "\"Briefly, we help clinics capture missed revenue from unanswered calls.\"", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step6: { id: 'step6', stage: 'Step 6 of 12', goal: 'Question flow', sayThis: "Ask about their current call volume, front desk staffing, and missed call challenges.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step7: { id: 'step7', stage: 'Step 7 of 12', goal: 'Mirror back problem', sayThis: "\"So if I'm hearing you correctly, the main challenge is [X]...\"", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step8: { id: 'step8', stage: 'Step 8 of 12', goal: 'Good fit signs', sayThis: "Listen for: high call volume, lost leads, front desk overwhelmed.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step9: { id: 'step9', stage: 'Step 9 of 12', goal: 'Weak fit signs', sayThis: "Listen for: very low volume, no budget, unwilling to change workflow.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step10: { id: 'step10', stage: 'Step 10 of 12', goal: 'Book Sales/Demo Zoom', sayThis: "\"Based on this, it makes sense to look at a full walkthrough. Can we book 45 mins next week?\"", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step11: { id: 'step11', stage: 'Step 11 of 12', goal: 'After-call message', sayThis: "Send calendar invite and quick recap email.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step12: { id: 'step12', stage: 'Step 12 of 12', goal: 'Quick notes', sayThis: "Log the answers in Quick Notes, then copy the clean summary into the Google Sheet tracker.", branchButtons: [{ id: 'back', label: 'Back', target: 'back' }, { id: 'done', label: 'Done', target: 'done' }] }
    }
  },

  // 6. SALES/DEMO WALKTHROUGH STEP MODE
  sales_demo: {
    id: 'sales_demo',
    name: 'Sales/Demo Walkthrough',
    workspace: 'medspa',
    initialNode: 'step1',
    isLinearStepper: true,
    nodes: {
      step1: { id: 'step1', stage: 'Step 1 of 20 (0-3 min)', goal: 'Purpose + emotional goal', sayThis: "Avalora Revenue Protection Walkthrough for [Clinic Name]", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }] },
      step2: { id: 'step2', stage: 'Step 2 of 20', goal: 'Before the call prep', sayThis: "Review fit call notes.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step3: { id: 'step3', stage: 'Step 3 of 20', goal: 'Presentation style', sayThis: "Consultative, authoritative, guiding.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step4: { id: 'step4', stage: 'Step 4 of 20 (3-5 min)', goal: '45-minute agenda', sayThis: "Set expectations for the call.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step5: { id: 'step5', stage: 'Step 5 of 20', goal: 'Re-anchor their problem', sayThis: "Bring up their main pain point from the fit call.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step6: { id: 'step6', stage: 'Step 6 of 20 (5-10 min)', goal: 'Revenue leak math', sayThis: "Show them how much they are losing by missing calls.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step7: { id: 'step7', stage: 'Step 7 of 20 (10-22 min)', goal: 'Personalized live demo', sayThis: "Run the demo tailored to their specific needs.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step8: { id: 'step8', stage: 'Step 8 of 20', goal: 'Demo scenario selector', sayThis: "Choose the scenario: after-hours, overflow, etc.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step9: { id: 'step9', stage: 'Step 9 of 20 (22-28 min)', goal: 'Workflow fit', sayThis: "Explain how it integrates with their existing CRM/staff.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step10: { id: 'step10', stage: 'Step 10 of 20 (28-32 min)', goal: 'Safety / HIPAA / medical boundaries', sayThis: "Reassure compliance and safety protocols.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step11: { id: 'step11', stage: 'Step 11 of 20 (32-36 min)', goal: 'Pause for questions', sayThis: "\"What questions do you have so far?\"", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step12: { id: 'step12', stage: 'Step 12 of 20', goal: 'Trial close', sayThis: "\"Can you see how this would help capture those lost leads?\"", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step13: { id: 'step13', stage: 'Step 13 of 20', goal: 'First deployment area', sayThis: "Discuss where to start (e.g., after-hours first).", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step14: { id: 'step14', stage: 'Step 14 of 20', goal: 'Booking mode', sayThis: "Explain how bookings are handled.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step15: { id: 'step15', stage: 'Step 15 of 20', goal: 'Services covered', sayThis: "List what the system will handle.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step16: { id: 'step16', stage: 'Step 16 of 20 (36-45 min)', goal: 'Package recommendation', sayThis: "Entry Recovery — $299/mo — 350 min\nStarter — $549/mo — 750 min\nCore — $849/mo — 1,500 min\nGrowth — $1,299/mo — 2,500 min\n\nRecommend the best fit.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step17: { id: 'step17', stage: 'Step 17 of 20', goal: 'If they don’t sign', sayThis: "Set clear next steps and follow-up date.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step18: { id: 'step18', stage: 'Step 18 of 20', goal: 'Activation packet', sayThis: "Explain onboarding process.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step19: { id: 'step19', stage: 'Step 19 of 20', goal: 'Payment link rule', sayThis: "Send link during the call if they are ready.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step20: { id: 'step20', stage: 'Step 20 of 20', goal: 'Onboarding handoff', sayThis: "Schedule the onboarding call.", branchButtons: [{ id: 'back', label: 'Back', target: 'back' }, { id: 'done', label: 'Done', target: 'done' }] }
    }
  },

  // 8. REFERRAL PARTNER LIVE CALL STEP MODE
  partner_live: {
    id: 'partner_live',
    name: 'Referral Partner Live Call',
    workspace: 'partner',
    initialNode: 'step1',
    isLinearStepper: true,
    nodes: {
      step1: { id: 'step1', stage: 'Step 1 of 17', goal: 'Main opener', sayThis: "Warning: Do not ask for referrals too early. Do not lead with payout. Do not say commission first. Do not imply their clients are badly run.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }] },
      step2: { id: 'step2', stage: 'Step 2 of 17', goal: 'Personalization insert', sayThis: "Mention their agency and clients.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step3: { id: 'step3', stage: 'Step 3 of 17', goal: 'What is Avalora?', sayThis: "Brief overview of the AI system for med spas.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step4: { id: 'step4', stage: 'Step 4 of 17', goal: 'Why are you calling me?', sayThis: "\"Because you work with exactly the type of clinics that need this.\"", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step5: { id: 'step5', stage: 'Step 5 of 17', goal: 'What do you want from me?', sayThis: "\"To see if this is something you'd feel comfortable introducing to your clients.\"", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step6: { id: 'step6', stage: 'Step 6 of 17', goal: 'What’s in it for me?', sayThis: "Value add for their clients, plus revenue share.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step7: { id: 'step7', stage: 'Step 7 of 17', goal: 'Clean Avalora explanation', sayThis: "Clear, non-technical explanation.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step8: { id: 'step8', stage: 'Step 8 of 17', goal: 'Light partner qualification', sayThis: "Ensure they actually have active clients in the space.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step9: { id: 'step9', stage: 'Step 9 of 17', goal: 'Main demo close', sayThis: "\"Let me show you a quick demo.\"", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step10: { id: 'step10', stage: 'Step 10 of 17', goal: 'Partner thank-you', sayThis: "Acknowledge their time.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step11: { id: 'step11', stage: 'Step 11 of 17', goal: 'How do I know you’ll pay me?', sayThis: "Explain tracking and agreements.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step12: { id: 'step12', stage: 'Step 12 of 17', goal: 'Why not recurring?', sayThis: "Explain the payment structure rationale.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step13: { id: 'step13', stage: 'Step 13 of 17', goal: 'Asking for introduction', sayThis: "How to smoothly ask for the first intro.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step14: { id: 'step14', stage: 'Step 14 of 17', goal: 'Objections', sayThis: "Handle common partner pushbacks.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step15: { id: 'step15', stage: 'Step 15 of 17', goal: 'Voicemail', sayThis: "What to leave on VM.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step16: { id: 'step16', stage: 'Step 16 of 17', goal: 'What not to say', sayThis: "Review boundaries.", branchButtons: [{ id: 'next', label: 'Next', target: 'next' }, { id: 'back', label: 'Back', target: 'back' }] },
      step17: { id: 'step17', stage: 'Step 17 of 17', goal: 'Full call flow', sayThis: "Wrap up.", branchButtons: [{ id: 'back', label: 'Back', target: 'back' }, { id: 'done', label: 'Done', target: 'done' }] }
    }
  }
};
