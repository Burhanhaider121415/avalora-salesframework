export type OutreachChannel = 'email' | 'instagram';

export interface OutreachTemplate {
  id: string;
  title: string;
  channel: OutreachChannel;
  body: string;
}

export const outreachTemplates: OutreachTemplate[] = [
  { id: 'email-treatment-growth', title: 'Treatment or Growth', channel: 'email', body: `Subject: [Clinic Name] + [Service] inquiries

Hi [First Name],
I saw [Visible Detail] around [Service].
When a clinic is actively promoting a treatment like that, the questions tend to show up everywhere—calls, DMs, and forms—often while the team is already with patients.
Avalora catches those booking inquiries and passes the details back to the front desk without replacing anyone.
Want me to send the short voice demo?
Burhan` },
  { id: 'email-premium', title: 'Premium Patient Experience', channel: 'email', body: `Subject: Patient response at [Clinic Name]

Hi [First Name],
[Visible Detail] at [Clinic Name] stood out. It says a lot about the standard you’re setting for patients.
That experience starts before the consultation—when someone first calls, sends a DM, or asks about availability.
Avalora covers overflow and after-hours inquiries, then hands the details back to your front desk.
Would the short demo be useful?
Burhan` },
  { id: 'email-booking-dm', title: 'Booking or DM Flow', channel: 'email', body: `Subject: [Clinic Name] booking inquiries

Hi [First Name],
I noticed [Visible Detail] at [Clinic Name].
A patient might ask a question on Instagram, call later, and only then be ready to book. That handoff can get messy even when the front desk is doing everything right.
Avalora captures the inquiry and turns it into a clear next step for the team.
Want me to send the short demo?
Burhan` },
  { id: 'email-after-hours', title: 'After-Hours Inquiries', channel: 'email', body: `Subject: After-hours inquiries at [Clinic Name]

Hi [First Name],
I noticed [Clinic Name] is actively promoting [Service].
A lot of people research aesthetic treatments after work, when the clinic is already closed. I was curious what happens when someone asks about availability at that point.
Avalora can capture the inquiry and prepare a clean handoff for the team the next day.
May I send you the short demo?
Burhan` },
  { id: 'email-bilingual', title: 'Bilingual Miami Inquiries', channel: 'email', body: `Subject: Bilingual inquiries at [Clinic Name]

Hi [First Name],
I noticed [Visible Detail] at [Clinic Name].
In Miami, the first patient conversation can begin in English or Spanish and arrive through a call, DM, or form—sometimes all three.
Avalora supports approved bilingual booking intake and returns the details to the clinic team.
Would a short demo be useful?
Burhan` },
  { id: 'email-founder', title: 'Founder or Operator Burden', channel: 'email', body: `Subject: A question for [Clinic Name]

Hi [First Name],
I saw [Visible Detail]—you still seem closely involved in the clinic.
When you’re the face of the business, calls, DMs, and booking questions have a way of finding their way back to you, especially after hours.
Avalora catches those moments and hands them back to the team cleanly.
Does any of that still land on your plate?
Burhan` },
  { id: 'email-unanswered-call', title: 'After Unanswered Call or Voicemail', channel: 'email', body: `Subject: Quick context for my call

Hi [First Name],
I tried reaching you after seeing [Visible Detail] at [Clinic Name].
This isn’t about replacing your receptionist. Avalora helps med spas catch missed calls, after-hours inquiries, and booking requests when the team is already occupied, then passes the details back cleanly.
The short demo explains it better than a long email.
Should I send it here?
Burhan` },
  { id: 'email-gatekeeper', title: 'After Gatekeeper', channel: 'email', body: `Subject: [Receptionist Name] pointed me your way

Hi [First Name],
[Receptionist Name] pointed me your way regarding new-patient calls and booking inquiries.
Avalora helps med spas catch missed, overflow, and after-hours inquiries while keeping the front desk in control.
I have a short demo showing both the patient conversation and what the staff receives afterward.
Would it be useful if I sent it over?
Burhan` },
  { id: 'email-general-inbox', title: 'General Clinic Inbox', channel: 'email', body: `Subject: For whoever handles booking operations

Hi,
I’m trying to reach whoever oversees new-patient calls and booking follow-up for [Clinic Name].
Avalora helps Miami med spas catch missed, overflow, and after-hours inquiries, then passes the details back to the clinic team. It supports reception rather than replacing it.
Could you please forward this to the owner, practice manager, or person responsible for patient communication?
Burhan
Avalora` },
  { id: 'email-owner-demo', title: 'Owner Requested Demo', channel: 'email', body: `Subject: The Avalora demo we discussed

Hi [First Name],
Thanks again for taking my call.
Here’s the short demonstration:
[Demo Link]
The part to notice is how Avalora handles the [Service/Scenario] inquiry, stays within non-clinical boundaries, and passes the booking details back to the team.
I’ll follow up [Day/Time], as agreed, to hear whether it fits [Clinic Name]’s standard.
Burhan` },
  { id: 'email-demo-follow-up', title: 'Demo Follow-Up', channel: 'email', body: `Subject: Did the demo fit your standard?

Hi [First Name],
Curious what you thought of the demonstration.
Based on what you mentioned about [Pain], the relevant part is how Avalora handles [Specific Scenario] and gives the team a clear handoff.
Did the voice and handoff feel close enough to [Clinic Name]’s standard to look at your workflow for 15 minutes?
Burhan` },
  { id: 'email-fit-call', title: 'Book Fit Call', channel: 'email', body: `Subject: A walkthrough for [Clinic Name]

Hi [First Name],
Based on what you said about [Pain], a generic presentation won’t be very useful.
I’d rather spend 15 minutes understanding your current flow, then build the walkthrough around [Service/Scenario].
Would [Option A] or [Option B] suit you better?
Burhan` },
  { id: 'email-fit-confirmation', title: 'Fit Call Confirmation', channel: 'email', body: `Subject: Avalora walkthrough — [Day and Time]

Hi [First Name],
Thanks for the conversation today.
I’ll build the walkthrough around [Exact Pain], using a [Service/Scenario] inquiry and showing how the details would return to your team.
We’re confirmed for [Day, Date, Time, Time Zone]:
[Meeting Link]
[Additional Attendee] is welcome to join.
Burhan` },
  { id: 'email-follow-up-1', title: 'No Reply Follow-Up 1', channel: 'email', body: `Subject: One reason I circled back

Hi [First Name],
A [Service] inquiry doesn’t wait until the front desk has a quiet moment.
That’s where Avalora fits—not by replacing the team, but by catching the call, DM, or form that arrives at the wrong time and turning it into a clear next step.
Is that already fully covered at [Clinic Name]?
Burhan` },
  { id: 'email-follow-up-2', title: 'No Reply Follow-Up 2', channel: 'email', body: `Subject: Covered already?

Hi [First Name],
Maybe you already have this covered.
When a new inquiry reaches [Clinic Name] after hours or while the team is with patients, does it reliably become a callback or booking task?
If it does, there’s no reason to complicate the process. If it doesn’t, the short Avalora demo may be worth hearing.
Burhan` },
  { id: 'email-close-loop', title: 'Close Loop', channel: 'email', body: `Subject: Close the loop?

Hi [First Name],
I don’t want to become another vendor who keeps resurfacing in your inbox.
I reached out because [Visible Detail] made [Relevant Angle] worth exploring for [Clinic Name], but the timing may simply be wrong.
Should I close this out for now, or circle back in [Month]?
Burhan` },
  { id: 'dm-treatment-post', title: 'Recent Treatment Post', channel: 'instagram', body: `Hi [First Name] — saw your post about [Service].
I imagine that brings in both “am I a candidate?” and “when can I get in?” messages.
Do most of those stay in DM, or does your team move them straight to booking?` },
  { id: 'dm-booking-path', title: 'Visible Booking Path', channel: 'instagram', body: `Hi [First Name] — noticed you make the consultation path pretty clear at [Clinic Name].
When someone asks a question in DM but isn’t ready to hit Book Now yet, does your front desk move them over manually?` },
  { id: 'dm-activity', title: 'Comment/DM Activity', channel: 'instagram', body: `Hi [First Name] — saw people asking about [Price/Availability/Service] under your [Post].
Do those conversations usually stay in Instagram until they book, or does your team track them somewhere else?` },
  { id: 'dm-founder', title: 'Founder-Led Clinic', channel: 'instagram', body: `Hi [First Name] — you seem pretty hands-on at [Clinic Name], especially around [Visible Detail].
Do new inquiries still end up finding their way back to you after hours, or has the team mostly taken that off your plate?` },
  { id: 'dm-premium', title: 'Premium Clinic', channel: 'instagram', body: `Hi [First Name] — [Visible Detail] at [Clinic Name] stood out. It feels like you care about the details of the patient experience.
Is the first reply to a new inquiry handled by one person, or by whoever is free when it comes in?` },
  { id: 'dm-bilingual', title: 'Bilingual Clinic', channel: 'instagram', body: `Hi [First Name] — noticed [Visible Detail] at [Clinic Name].
Do most Spanish-speaking inquiries come in by phone, or do you get a fair number through Instagram too?` },
  { id: 'dm-treatment-story', title: 'Treatment/Promotion Story', channel: 'instagram', body: `That [Service/Offer] will probably bring in a few availability and pricing questions.
Do most people reply here, call the clinic, or use the booking link?` },
  { id: 'dm-open-appointment', title: 'Open Appointment Story', channel: 'instagram', body: `When you post an opening like that, does the front desk usually manage the replies manually in DM?` },
  { id: 'dm-education', title: 'Educational Story', channel: 'instagram', body: `Good explanation of [Topic].
Do people usually reply with consultation questions after content like this?` },
  { id: 'dm-owner-reply', title: 'After Owner Replies', channel: 'instagram', body: `That makes sense.
I asked because I run Avalora. We help Miami med spas catch inquiries that come through calls, DMs, forms, or after hours, then give the front desk a clear next step.
I have a short voice demonstration. Want me to send it?` },
  { id: 'dm-what-is', title: 'What Is Avalora?', channel: 'instagram', body: `Think of Avalora as a backup layer around the front desk.
It catches missed calls, after-hours inquiries, DMs, and booking intent, then passes the details back to the clinic team using the clinic’s approved answers and boundaries.
The short demo is much easier than a written explanation. Want me to send it?` },
  { id: 'dm-send-demo', title: 'Send Demonstration', channel: 'instagram', body: `Perfect—here it is:
[Demo Link]
The part to notice is the patient experience and what the front desk receives afterward.
I’ll check back [Day/Time], like we agreed.` },
  { id: 'dm-unanswered-call', title: 'After Unanswered Call', channel: 'instagram', body: `Hi [First Name] — Burhan from Avalora here.
I tried you earlier after seeing [Visible Detail] at [Clinic Name].
This isn’t about replacing reception. We help med spas catch missed, overflow, and after-hours booking inquiries.
Want me to send the short demo here?` },
  { id: 'dm-demo-follow-up', title: 'Demonstration Follow Up', channel: 'instagram', body: `Quick question, [First Name]—did the voice and staff handoff feel close enough to [Clinic Name]’s standard to look at your workflow, or not really?` },
  { id: 'dm-fit-call', title: 'Move to Fit Call', channel: 'instagram', body: `From what you said about [Pain], the generic demo only covers part of it.
Better to spend 15 minutes around your actual workflow and build the walkthrough around [Service/Scenario].
Would [Option A] or [Option B] be easier?` },
  { id: 'dm-follow-up-1', title: 'No Reply Follow Up 1', channel: 'instagram', body: `One reason I asked: [Service] questions often arrive while the team is already with patients.
Is that follow-up handled in one place at [Clinic Name], or across calls and DMs?` },
  { id: 'dm-follow-up-2', title: 'No Reply Follow Up 2', channel: 'instagram', body: `Maybe you already have this covered.
Are after-hours and missed booking inquiries fully handled today, or is some of it still manual?` },
  { id: 'dm-close', title: 'Final Soft Close', channel: 'instagram', body: `I’ll leave it here after this, [First Name].
I reached out because [Visible Detail] made [Relevant Angle] seem potentially useful for [Clinic Name].
Happy to revisit it if it becomes a priority later.` },
  { id: 'dm-voice-note', title: 'Voice Note', channel: 'instagram', body: `Hey [First Name], thanks for getting back to me.
The reason I asked about [Their Answer] is that Avalora was built for those moments when patient interest comes in but the front desk is already handling the clinic.
It can catch the call or inquiry, stay within your approved rules, and give the team a clear next step.
I have a short demonstration so you can judge the voice and patient experience yourself. I can send it if you’d like.` },
  { id: 'dm-video', title: 'Video DM', channel: 'instagram', body: `Hey [First Name], Burhan here from Avalora.
I wanted to put a face to the name because I know med-spa owners get plenty of questionable AI outreach.
I reached out after seeing [Visible Detail] at [Clinic Name].
We’re not trying to replace reception. Avalora catches the call, DM, or after-hours booking request that arrives while the team is already busy, then passes it back cleanly.
I have a short voice demonstration built around a med-spa inquiry. Want me to send it?` },
  { id: 'dm-micro-replies', title: 'Micro Replies: Receptionist / CRM / AI / Pricing / Send Info', channel: 'instagram', body: `“We Already Have a Receptionist”
Absolutely—that’s who Avalora is designed to support, not replace. The issue is usually the moments no one can physically catch in real time. The demo will let you judge whether that extra coverage would fit your workflow.

“We Already Have a CRM or Booking System”
That makes sense. Avalora isn’t meant to replace it. Your CRM or booking system works once the inquiry has been captured. Avalora helps catch the call, DM, or booking intent before it becomes a clean record.

“Is This AI?”
Yes, it uses AI-supported voice and workflow technology. The clinic still controls approved answers, boundaries, escalation rules, and staff handoff. Avalora doesn’t diagnose or give medical advice.

“How Much?”
It depends on what you want covered and the expected volume. A short fit call is the quickest way to understand the workflow and give you the right option.

“Send Information”
Absolutely. The demonstration will be more useful than a brochure because you can hear the patient experience for yourself.` },
];

export function getTemplateFields(body: string): string[] {
  return [...new Set(Array.from(body.matchAll(/\[([^\]]+)\]/g), (match) => match[1]))];
}
