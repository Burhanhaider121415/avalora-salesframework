export interface LibrarySection {
  id: string;
  title: string;
  content: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  purpose: string;
  primaryGoal: string;
  whenToUse: string;
  sections: LibrarySection[];
  relatedLiveMode?: string;
  relatedObjections?: string;
  relatedNotes?: string;
}

export const medSpaLibrary: LibraryItem[] = [
  {
    id: 'lib_ms_gatekeeper',
    title: 'Receptionist / Gatekeeper Framework',
    purpose: 'Navigate the front desk effectively.',
    primaryGoal: 'Get routed to the owner/manager or capture the correct person, callback time, and direct email.',
    whenToUse: 'When the front desk or a receptionist answers.',
    sections: [
      { id: 's1', title: 'Main Opener', content: 'Hi, this is [Name] with Avalora. Maybe you can help me for a moment...' },
      { id: 's2', title: 'Routing Ladder', content: 'Live transfer -> specific callback time -> right name + email -> voicemail.' }
    ],
    relatedLiveMode: 'medspa_gatekeeper'
  },
  {
    id: 'lib_ms_owner',
    title: 'Owner / Operator Cold Call Framework',
    purpose: 'Engage the owner and secure a demo or fit call.',
    primaryGoal: 'Permission -> personalized observation -> problem -> diagnostic -> close.',
    whenToUse: 'When speaking directly to the Med Spa owner or operator.',
    sections: [
      { id: 's1', title: 'Curiosity-First Opener', content: 'I know I am catching you in the middle of your day—do you have 30 seconds for me to tell you why I am calling, and you can let me know if we should keep talking?' },
      { id: 's2', title: '6 Pitch Angles', content: 'Missed-call recovery, Speed-to-lead, After-hours capture, Marketing ROI protection, Front-desk overflow, Bilingual Miami angle.' }
    ],
    relatedLiveMode: 'medspa_owner'
  },
  {
    id: 'lib_ms_fit_call',
    title: '15-Minute Fit Call Playbook',
    purpose: 'Determine if there is a mutual fit before a full demo.',
    primaryGoal: 'Qualification and personalization. DO NOT explain the whole product here.',
    whenToUse: 'During a scheduled 15-minute discovery call.',
    sections: [
      { id: 's1', title: 'Question Flow', content: 'Focus on current call volume, front desk staffing, and missed call challenges.' },
      { id: 's2', title: 'Good vs Weak Fit Signs', content: 'Good: High call volume, lost leads. Weak: Very low volume, no budget.' }
    ],
    relatedLiveMode: 'fit_call'
  },
  {
    id: 'lib_ms_demo',
    title: 'Sales/Demo Walkthrough',
    purpose: 'Comprehensive 45-minute presentation.',
    primaryGoal: 'Show revenue leak math, run a personalized demo, and trial close.',
    whenToUse: 'During the scheduled 45-minute Sales/Demo Zoom call.',
    sections: [
      { id: 's1', title: 'Agenda Timeline', content: '0-3 min: Re-anchor\n3-5 min: Frame\n5-10 min: Revenue leak\n10-22 min: Demo\n22-28 min: Workflow\n28-32 min: Safety\n32-36 min: Questions\n36-45 min: Close' }
    ],
    relatedLiveMode: 'sales_demo'
  },
  {
    id: 'lib_ms_pricing',
    title: 'Client Package Reference (Pricing)',
    purpose: 'Clear, client-facing pricing details.',
    primaryGoal: 'Provide accurate pricing without exposing internal margins.',
    whenToUse: 'When the owner asks for pricing or during the Demo close.',
    sections: [
      { id: 's1', title: 'Entry Recovery', content: '$299/mo — 350 min' },
      { id: 's2', title: 'Starter', content: '$549/mo — 750 min' },
      { id: 's3', title: 'Core', content: '$849/mo — 1,500 min' },
      { id: 's4', title: 'Growth', content: '$1,299/mo — 2,500 min' }
    ]
  },
  {
    id: 'lib_ms_email_system',
    title: 'Email Research & Copywriter System',
    purpose: 'Rules for Email Outreach OS.',
    primaryGoal: 'Guide email flow from research to CTA.',
    whenToUse: 'Before and during email drafting.',
    sections: [
      { id: 's1', title: 'Email Strategy', content: 'Research -> safest angle -> email scenario -> CTA stage -> final email/review -> follow-up.' }
    ]
  },
  {
    id: 'lib_ms_ig_system',
    title: 'Instagram DM Writing System',
    purpose: 'Rules for Instagram Outreach OS.',
    primaryGoal: 'Build familiarity, start a conversation, earn demo permission.',
    whenToUse: 'Before and during Instagram DM outreach.',
    sections: [
      { id: 's1', title: 'Instagram Strategy', content: 'Familiarity first -> small conversation -> demo bridge -> 15-minute call.' },
      { id: 's2', title: 'First DM Readiness Gate', content: 'Do not default to "here is the demo".' }
    ]
  },
  {
    id: 'lib_ms_safety',
    title: 'Positioning / Safety Rules',
    purpose: 'Ensure compliance and correct brand positioning.',
    primaryGoal: 'Avoid medical claims and AI chat fluff.',
    whenToUse: 'Always.',
    sections: [
      { id: 's1', title: 'Safety Clause', content: 'We are a patient protection system, not a clinical triage service.' }
    ]
  }
];

export const partnerLibrary: LibraryItem[] = [
  {
    id: 'lib_pt_gatekeeper',
    title: 'Referral Partner Gatekeeper',
    purpose: 'Navigate partner front desk.',
    primaryGoal: 'Get to decision-maker or best way to send short demo.',
    whenToUse: 'When calling agencies, reps, or consultants.',
    sections: [
      { id: 's1', title: 'Main Gatekeeper Opener', content: 'I am reaching out because we are building a small referral partner circle...' }
    ],
    relatedLiveMode: 'partner_gatekeeper'
  },
  {
    id: 'lib_pt_live',
    title: 'Referral Partner Live Call',
    purpose: 'Pitch the partnership to the agency owner/rep.',
    primaryGoal: 'Trust first -> demo -> partner thank-you -> possible intro.',
    whenToUse: 'When speaking to the potential referral partner.',
    sections: [
      { id: 's1', title: 'Warnings', content: 'Do not ask for referrals too early. Do not lead with payout. Do not say commission first. Do not imply their clients are badly run.' }
    ],
    relatedLiveMode: 'partner_live'
  },
  {
    id: 'lib_pt_payout',
    title: 'Referral Partner Thank-You / Payout Reference',
    purpose: 'Internal guide for partner compensation.',
    primaryGoal: 'Explain the payout structure without using owner-facing pricing language or calling it "commission" upfront.',
    whenToUse: 'When partners ask "How do I know you will pay me?" or "What is in it for me?"',
    sections: [
      { id: 's1', title: 'Explanation Logic', content: 'Use the approved source materials before quoting payout details. Do not invent amounts in-app.' },
      { id: 's2', title: 'Why not recurring?', content: 'Use the approved payout reference for the rationale. Keep client pricing separate from partner thank-you language.' }
    ]
  },
  {
    id: 'lib_pt_qa',
    title: 'Partner Follow-Up QA Checklist',
    purpose: 'Ensure post-call communications meet standards.',
    primaryGoal: 'Maintain professionalism and follow-through.',
    whenToUse: 'Before sending follow-up emails to partners.',
    sections: [
      { id: 's1', title: 'Checklist', content: '- Correct audience\n- Correct angle\n- No forbidden language\n- CTA is appropriate\n- Not over-pitching\n- Next action is clear' }
    ]
  }
];
