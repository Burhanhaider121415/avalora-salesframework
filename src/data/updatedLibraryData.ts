import type { LibraryItem } from './libraryData';

export const updatedMedSpaLibrary: LibraryItem[] = [
  {
    id: 'lib_updated_gatekeeper',
    title: 'Document 1 — Receptionist / Gatekeeper Cold Call Framework',
    purpose: 'Updated Source Text Reference',
    primaryGoal: 'Apply only the approved corrections to the existing framework',
    whenToUse: 'Receptionist / gatekeeper calls',
    relatedLiveMode: 'medspa_gatekeeper',
    sections: [{
      id: 'source',
      title: 'Approved Gatekeeper Corrections',
      content: `These are the only corrections. Everything else stays exactly as it is.

Step 1 — Main Receptionist Opener
“Hi, this is Burhan with Avalora. Maybe you can help me for a moment.
I’m trying to reach whoever oversees new-patient calls and booking inquiries for [Clinic Name].
Would that normally be the owner, practice manager, or office manager?”

Step 2 — What Is This About?
“It’s about missed-call recovery and booking support for the clinic. Avalora helps catch new-patient inquiries when the team is busy or the clinic is closed, then hands the details back to staff.
Who usually handles that workflow there?”

Step 3 — Is This a Sales Call?
“It is outreach, yes. I’m trying to reach the person who oversees missed calls, booking follow-up, or front-desk overflow for the clinic.
Would that be the owner, manager, or operations?”

Step 4 — We Already Have a Receptionist
“Absolutely—and Avalora is built to support reception, not replace it.
It helps with missed moments, like another call coming in while the team is with a patient or an inquiry arriving after hours.
Who handles that side of the workflow there?”

Step 8 — Gatekeeper-Safe Explanation
“Avalora supports the front desk when calls or booking inquiries arrive while the team is busy or after hours.
It captures the inquiry and hands the details back to staff. It doesn’t replace reception or provide medical advice.
Who would be the right person to review that?”

Step 9 — If She Transfers You
“Hi [Name], thanks for taking the call. [Receptionist Name] connected me.
I’m Burhan with Avalora. Can I give you the 20-second reason I reached out, and then you can tell me if it’s relevant?”

Step 11 — Voicemail
“Hi, this is Burhan with Avalora. I’m trying to reach whoever oversees new-patient calls and booking follow-up for [Clinic Name].
We help Miami med spas recover missed and after-hours inquiries while supporting the front desk.
I’ll try again, or I can send the short demo. Again, Burhan at [Phone Number].”

Step 12 — Data Capture Before Ending
Add these two items to the existing list:
• Main objection
• Next action/date

Step 13 — Pricing and Safety Questions
Do not show pricing and AI/safety together in one long block. Change Step 13 into four selectable options:
• Pricing
• Is this AI?
• Safety / medical boundaries
• CRM / booking system
Only show the relevant answer after Burhan selects the question.

These are the only changes. Keep the rest of the current receptionist framework unchanged.`
    }],
  },
];
