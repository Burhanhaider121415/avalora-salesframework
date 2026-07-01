import { cadenceSteps } from './cadenceData';
import { medSpaLibrary, partnerLibrary } from './libraryData';
import { objectionBank } from './objectionsData';
import type { NoteContext, Workspace } from '../types/app';

export type SearchContext =
  | 'gatekeeper'
  | 'owner'
  | 'fit_call'
  | 'demo'
  | 'email'
  | 'ig'
  | 'partner'
  | 'safety'
  | 'cadence';

export interface SearchEntry {
  id: string;
  title: string;
  workspace: Workspace;
  context: SearchContext;
  answer: string;
  nextStep: string;
  safeLanguage: string;
  keywords: string[];
  relatedLiveMode?: string;
  relatedOutreachMode?: string;
  relatedLibraryWorkspace?: Workspace;
  relatedNotesField?: NoteContext;
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function makeKeywords(...values: string[]): string[] {
  return values.map(normalize);
}

const hipaaReply = objectionBank.find((item) => item.id === 'obj_hipaa');
const priceReply = objectionBank.find((item) => item.id === 'obj_price_owner');
const gatekeeperReceptionist = objectionBank.find((item) => item.id === 'obj_gk_already_have');
const ownerReceptionist = objectionBank.find((item) => item.id === 'obj_own_already_have');
const pricingLibrary = medSpaLibrary.find((item) => item.id === 'lib_ms_pricing');
const partnerPayoutLibrary = partnerLibrary.find((item) => item.id === 'lib_pt_payout');

const cadenceEmailFollowUp = cadenceSteps.find((step) => step.touch === 7);
const cadenceDmFollowUp = cadenceSteps.find((step) => step.touch === 6);

export const searchEntries: SearchEntry[] = [
  {
    id: 'search_send_info',
    title: 'Send Info / Light Follow-Up',
    workspace: 'medspa',
    context: 'email',
    answer:
      'Send the approved short demo or overview asset, keep the CTA light, and set a clear follow-up step.',
    nextStep: 'Open Email Mode and use the approved research-to-CTA flow before sending.',
    safeLanguage: 'Do not promise results or improvise medical/compliance claims.',
    keywords: makeKeywords('send info', 'send information', 'brochure', 'pdf', 'follow-up email'),
    relatedOutreachMode: 'email_mode',
    relatedNotesField: 'email',
  },
  {
    id: 'search_gatekeeper_receptionist',
    title: gatekeeperReceptionist?.title ?? 'Already Have Receptionist (Gatekeeper)',
    workspace: 'medspa',
    context: 'gatekeeper',
    answer:
      gatekeeperReceptionist?.response ??
      'We handle overflow when the front desk is busy, not receptionist replacement.',
    nextStep: 'Route to the owner or capture the callback time and direct email.',
    safeLanguage: 'Avoid AI receptionist and replacement language.',
    keywords: makeKeywords(
      'already have receptionist',
      'AI',
      'front desk',
      'busy',
      'receptionist replacement'
    ),
    relatedLiveMode: 'medspa_gatekeeper',
    relatedNotesField: 'gatekeeper',
  },
  {
    id: 'search_ai_positioning',
    title: 'AI / Receptionist Positioning',
    workspace: 'medspa',
    context: 'safety',
    answer:
      'We are not an AI bot or a receptionist replacement. We handle patient communication and booking support when the front desk is busy or the clinic is closed.',
    nextStep: 'Use the safety wording and move back to overflow, after-hours capture, or missed-call recovery.',
    safeLanguage: 'Avoid AI receptionist, chatbot, and replacement language.',
    keywords: makeKeywords('AI', 'AI bot', 'chatbot', 'receptionist replacement', 'AI receptionist'),
    relatedLibraryWorkspace: 'medspa',
    relatedNotesField: 'owner',
  },
  {
    id: 'search_gatekeeper_call_later',
    title: 'Owner Busy / Call Later',
    workspace: 'medspa',
    context: 'gatekeeper',
    answer:
      "No problem, I don't want to interrupt them. What is the best time to try back? Also, what is their direct email so I can send a quick summary of why I called?",
    nextStep: 'Capture the callback time and direct email before ending the call.',
    safeLanguage: 'Keep it operational; do not pitch harder when the owner is busy.',
    keywords: makeKeywords('busy', 'call later', 'owner busy', 'send info', 'callback'),
    relatedLiveMode: 'medspa_gatekeeper',
    relatedNotesField: 'gatekeeper',
  },
  {
    id: 'search_gatekeeper_not_interested',
    title: 'Not Interested Exit',
    workspace: 'medspa',
    context: 'gatekeeper',
    answer: 'Understood, thank you for your time.',
    nextStep: 'Exit cleanly and log the call outcome in Notes.',
    safeLanguage: 'Do not push after a hard no.',
    keywords: makeKeywords('not interested', 'no thanks', 'not now'),
    relatedLiveMode: 'medspa_gatekeeper',
    relatedNotesField: 'gatekeeper',
  },
  {
    id: 'search_owner_receptionist',
    title: ownerReceptionist?.title ?? 'Already Have Receptionist (Owner)',
    workspace: 'medspa',
    context: 'owner',
    answer:
      ownerReceptionist?.response ??
      'Position Avalora as overflow and after-hours support, not staff replacement.',
    nextStep: 'Shift the conversation toward missed-call recovery or after-hours capture.',
    safeLanguage: 'Avoid replacement, guaranteed ROI, and guaranteed bookings language.',
    keywords: makeKeywords('owner busy', 'front desk', 'missed calls', 'after-hours'),
    relatedLiveMode: 'medspa_owner',
    relatedNotesField: 'owner',
  },
  {
    id: 'search_owner_pricing',
    title: priceReply?.title ?? 'Pricing Objection (Owner)',
    workspace: 'medspa',
    context: 'owner',
    answer:
      priceReply?.response ??
      'Keep pricing in the client package context and confirm fit before going deeper.',
    nextStep:
      'Use the client package reference only when pricing is appropriate and keep partner payout separate.',
    safeLanguage: 'Client pricing only; do not mix in partner payout language.',
    keywords: makeKeywords('price', 'pricing', 'how much', 'cost', '$299'),
    relatedLiveMode: 'fit_call',
    relatedLibraryWorkspace: 'medspa',
    relatedNotesField: 'demo',
  },
  {
    id: 'search_owner_bilingual',
    title: 'Bilingual / Spanish Angle',
    workspace: 'medspa',
    context: 'owner',
    answer:
      'The reason I am calling is we help Miami clinics instantly handle new patient inquiries in both perfect English and Spanish, so you do not lose revenue due to language barriers.',
    nextStep: 'Open the owner live path and use the bilingual angle only when it matches the clinic.',
    safeLanguage: 'Keep the framing around language access and patient communication support.',
    keywords: makeKeywords('Spanish', 'bilingual', 'language barrier'),
    relatedLiveMode: 'medspa_owner',
    relatedNotesField: 'owner',
  },
  {
    id: 'search_hipaa',
    title: hipaaReply?.title ?? 'HIPAA & Compliance Concern',
    workspace: 'medspa',
    context: 'safety',
    answer:
      hipaaReply?.response ??
      'Avalora does not diagnose, prescribe, or give medical advice.',
    nextStep: 'Use the safety wording and avoid HIPAA-proof or medical-triage claims.',
    safeLanguage: 'Use safety wording, not HIPAA-proof.',
    relatedLibraryWorkspace: 'medspa',
    relatedNotesField: 'demo',
    keywords: makeKeywords('HIPAA', 'compliance', 'medical advice', 'safety', 'what is Avalora'),
  },
  {
    id: 'search_crm',
    title: 'CRM / Workflow Fit',
    workspace: 'medspa',
    context: 'demo',
    answer: 'Explain how it integrates with their existing CRM/staff.',
    nextStep: 'Use the Sales/Demo workflow-fit section and capture the booking/CRM system in Notes.',
    safeLanguage: 'Do not turn the app into a CRM; keep Google Sheet tracking external.',
    keywords: makeKeywords('CRM', 'booking system', 'workflow', 'integration'),
    relatedLiveMode: 'sales_demo',
    relatedNotesField: 'fit_call',
  },
  {
    id: 'search_follow_up_email',
    title: 'Follow-Up Email',
    workspace: 'medspa',
    context: 'cadence',
    answer: cadenceEmailFollowUp?.action ?? 'Email follow-up and DM - Professional follow-up / value angle',
    nextStep: 'Open Email Mode for the approved follow-up flow, then log the next step in Notes.',
    safeLanguage: 'Keep the CTA matched to the current outreach temperature.',
    keywords: makeKeywords('follow-up email', 'email follow up', 'call later email'),
    relatedOutreachMode: 'email_mode',
    relatedNotesField: 'email',
  },
  {
    id: 'search_dm_follow_up',
    title: 'DM After No Reply',
    workspace: 'medspa',
    context: 'cadence',
    answer: cadenceDmFollowUp?.action ?? 'Instagram DM follow-up - Push the core pain again',
    nextStep: 'Open Instagram Mode and keep the message relationship-first before moving toward demo permission.',
    safeLanguage: 'Do not jump straight to a hard pitch after silence.',
    keywords: makeKeywords('DM after no reply', 'instagram follow up', 'no reply', 'DM follow-up'),
    relatedOutreachMode: 'ig_mode',
    relatedNotesField: 'ig',
  },
  {
    id: 'search_front_desk',
    title: 'Missed Calls / Front Desk Overflow',
    workspace: 'medspa',
    context: 'owner',
    answer:
      'The reason I am calling is we give your front desk a safety net, handling the overflow calls when they are busy with patients in the clinic so you never miss a new booking.',
    nextStep: 'Use the owner live path and follow with the short diagnostic question.',
    safeLanguage: 'Frame it as overflow support, not receptionist replacement.',
    keywords: makeKeywords('front desk', 'after-hours', 'missed calls', 'owner busy'),
    relatedLiveMode: 'medspa_owner',
    relatedNotesField: 'owner',
  },
  {
    id: 'search_partner_payout',
    title: 'Partner Payout / Will You Pay Me?',
    workspace: 'partner',
    context: 'partner',
    answer:
      'Use the approved Referral Partner Thank-You / Payout Reference before quoting details. This app does not load payout amounts in-line.',
    nextStep: 'Open the Referral Partner library reference and keep client pricing separate from partner payout language.',
    safeLanguage: 'Use thank-you payout language; do not use commission in owner-facing contexts.',
    keywords: makeKeywords('partner payout', 'will you pay me', 'commission', 'referral fee', 'partner thank-you'),
    relatedLibraryWorkspace: 'partner',
    relatedNotesField: 'partner',
  },
  {
    id: 'search_partner_referral',
    title: 'Referral Partner Intro',
    workspace: 'partner',
    context: 'partner',
    answer: 'To see if this is something you would feel comfortable introducing to your clients.',
    nextStep: 'Open the Referral Partner live path and move toward a first introduction only after trust is established.',
    safeLanguage: 'Do not lead with payout or ask for referrals too early.',
    keywords: makeKeywords('referral', 'intro', 'partner intro', 'introduction'),
    relatedLiveMode: 'partner_live',
    relatedNotesField: 'partner',
  },
  {
    id: 'search_avalora_positioning',
    title: 'What Is Avalora?',
    workspace: 'medspa',
    context: 'fit_call',
    answer: 'Briefly, we help clinics capture missed revenue from unanswered calls.',
    nextStep: 'Use the fit-call intro, then anchor the conversation in workflow and missed patient opportunities.',
    safeLanguage: 'Keep positioning around patient communication and booking support.',
    keywords: makeKeywords('what is Avalora', 'Avalora', 'patient communication', 'booking support'),
    relatedLiveMode: 'fit_call',
    relatedLibraryWorkspace: 'medspa',
    relatedNotesField: 'fit_call',
  },
  {
    id: 'search_partner_library',
    title: partnerPayoutLibrary?.title ?? 'Referral Partner Thank-You / Payout Reference',
    workspace: 'partner',
    context: 'partner',
    answer:
      'Explain the payout structure without using owner-facing pricing language or calling it commission upfront.',
    nextStep: 'Use the partner payout reference and keep the exact amount outside the app until approved source material is loaded.',
    safeLanguage: 'Keep payout language partner-only and do not invent amounts.',
    keywords: makeKeywords('partner thank-you', 'how do I know you will pay me', 'why not recurring'),
    relatedLibraryWorkspace: 'partner',
    relatedNotesField: 'partner',
  },
  {
    id: 'search_pricing_library',
    title: pricingLibrary?.title ?? 'Client Package Reference (Pricing)',
    workspace: 'medspa',
    context: 'demo',
    answer:
      'Entry Recovery - $299/mo - 350 min | Starter - $549/mo - 750 min | Core - $849/mo - 1,500 min | Growth - $1,299/mo - 2,500 min',
    nextStep: 'Use client pricing only in the client package context and keep it separate from partner thank-you language.',
    safeLanguage: 'Client package pricing only.',
    keywords: makeKeywords('client package', '$299', '$549', '$849', '$1299'),
    relatedLibraryWorkspace: 'medspa',
    relatedNotesField: 'demo',
  },
];

export function normalizeSearchValue(value: string): string {
  return normalize(value);
}
