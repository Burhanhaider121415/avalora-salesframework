export interface Objection {
  id: string;
  title: string;
  whatTheySaid: string;
  whatItMeans: string;
  context: 'gatekeeper' | 'owner' | 'email' | 'ig' | 'demo' | 'partner' | 'all';
  workspace: 'medspa' | 'partner' | 'all';
  response: string;
  whyItWorks: string;
  redirectTarget?: string;
  doNotSay?: string;
  relatedLiveMode?: string;
  relatedEmailVersion?: string;
  relatedLibraryId?: string;
  relatedNotesField?: string;
  keywords: string[];
}

export const objectionBank: Objection[] = [
  {
    id: 'obj_gk_already_have',
    title: 'Already Have Receptionist (Gatekeeper)',
    whatTheySaid: "We already have a receptionist.",
    whatItMeans: "I am the receptionist and I think you're selling my replacement.",
    context: 'gatekeeper',
    workspace: 'medspa',
    response: "Oh, that's exactly why I'm calling. We aren't an AI bot or a replacement. We just handle the overflow when you are busy with a patient in front of you. Is the owner around for a quick 30 seconds?",
    whyItWorks: "Validates their job and lowers defenses by explicitly stating you are not replacing them.",
    doNotSay: "Your receptionist is failing, AI receptionist, receptionist replacement",
    relatedLiveMode: 'medspa_gatekeeper',
    keywords: ['already have receptionist', 'front desk', 'busy', 'receptionist', 'AI', 'replacement']
  },
  {
    id: 'obj_own_already_have',
    title: 'Already Have Receptionist (Owner)',
    whatTheySaid: "I already have a front desk team.",
    whatItMeans: "I don't think I have a problem, or I think you're selling an expensive bot.",
    context: 'owner',
    workspace: 'medspa',
    response: "I completely understand. Most of our partners have amazing front desks. The problem we solve is capturing the missed patient opportunities that happen when your team is busy treating someone in the clinic or after hours.",
    whyItWorks: "Pivots from 'replacing the receptionist' to 'protecting missed revenue / overflow coverage'.",
    doNotSay: "Your receptionist is failing, guaranteed ROI, guaranteed bookings",
    relatedLiveMode: 'medspa_owner',
    keywords: ['already have receptionist', 'front desk', 'owner busy', 'missed calls', 'after-hours']
  },
  {
    id: 'obj_price_owner',
    title: 'Pricing Objection (Owner)',
    whatTheySaid: "How much is this?",
    whatItMeans: "Is this worth my time? Are you too expensive?",
    context: 'owner',
    workspace: 'medspa',
    response: "It's performance-based and scales with your call volume, but right now I don't even know if we are a fit. That's why I'd love to just grab 15 minutes to see if your clinic is a match.",
    whyItWorks: "Defers price to maintain the diagnostic frame.",
    relatedLiveMode: 'fit_call',
    relatedLibraryId: 'lib_ms_pricing',
    keywords: ['price', 'pricing', 'how much', 'cost', 'expensive']
  },
  {
    id: 'obj_send_info_email',
    title: 'Send Info (Email Reply)',
    whatTheySaid: "Just send me some info.",
    whatItMeans: "I don't want to talk to you, but I'm slightly curious or just blowing you off.",
    context: 'email',
    workspace: 'medspa',
    response: "Send the approved short demo or overview asset, keep the CTA light, and set a clear follow-up step.",
    whyItWorks: "Provides a lightweight asset (like a 2-min demo video) instead of pushing for a call immediately.",
    relatedEmailVersion: 'email_mode',
    keywords: ['send info', 'send information', 'brochure', 'pdf']
  },
  {
    id: 'obj_pt_commission',
    title: 'Payout/Commission Hesitation (Partner)',
    whatTheySaid: "How much commission do I get?",
    whatItMeans: "What is my financial incentive?",
    context: 'partner',
    workspace: 'partner',
    response: "We offer a partner thank-you payout for successful introductions. Use the approved partner payout reference before quoting details.",
    whyItWorks: "Keeps it professional. Reframes 'commission' as a 'thank-you payout'.",
    doNotSay: "Commission (in owner-facing contexts)",
    relatedLibraryId: 'lib_pt_payout',
    relatedLiveMode: 'partner_live',
    keywords: ['commission', 'payout', 'referral fee', 'kickback', 'partner thank-you']
  },
  {
    id: 'obj_hipaa',
    title: 'HIPAA & Compliance Concern',
    whatTheySaid: "Is this HIPAA compliant? Are you giving medical advice?",
    whatItMeans: "I am worried about liability and patient safety.",
    context: 'all',
    workspace: 'medspa',
    response: "Avalora does not diagnose, prescribe, or give medical advice. We act as patient communication and booking support.",
    whyItWorks: "Uses exact safety phrasing to shut down liability fears.",
    doNotSay: "HIPAA-proof, medical triage, we give advice",
    relatedLibraryId: 'lib_ms_safety',
    keywords: ['HIPAA', 'medical advice', 'diagnose', 'prescribe', 'compliance', 'safety']
  }
];
