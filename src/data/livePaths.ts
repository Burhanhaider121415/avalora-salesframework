export type ActionTarget = 'next' | 'back' | 'disposition' | string;

export interface BranchButton {
  id: string;
  label: string;
  target: ActionTarget;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface ScriptNode {
  id: string;
  stage: string;
  goal: string;
  instructions?: string[];
  sayThis: string;
  useWhen?: string;
  branchButtons: BranchButton[];
}

export interface LivePath {
  id: string;
  name: string;
  workspace: 'medspa' | 'partner';
  nodes: Record<string, ScriptNode>;
  initialNode: string;
}

export const livePaths: Record<string, LivePath> = {
  medspa_gatekeeper: {
  "id": "medspa_gatekeeper",
  "name": "Receptionist / Gatekeeper",
  "workspace": "medspa",
  "initialNode": "opener",
  "nodes": {
    "opener": {
      "id": "opener",
      "stage": "Main Receptionist Opener",
      "goal": "Get connected to the owner/operator or the person responsible.",
      "sayThis": "Hi, this is [Name] with Avalora. Maybe you can help me for a moment.\n\nI am calling about patient inquiry flow and missed booking inquiries for [Clinic Name] - not anything clinical and not a patient issue.\n\nWho usually handles that side of the clinic: the owner, practice manager, or office manager?",
      "branchButtons": [
        {
          "id": "transfer",
          "label": "If they transfer you",
          "target": "transfer"
        },
        {
          "id": "what_is_this",
          "label": "What is this about?",
          "target": "what_is_this"
        },
        {
          "id": "is_sales",
          "label": "Is this a sales call?",
          "target": "is_sales"
        },
        {
          "id": "already_have",
          "label": "We already have a receptionist",
          "target": "already_have"
        },
        {
          "id": "busy",
          "label": "Owner/manager is busy",
          "target": "busy"
        },
        {
          "id": "not_interested",
          "label": "We are not interested",
          "target": "not_interested"
        },
        {
          "id": "more_context",
          "label": "Needs more context",
          "target": "more_context"
        }
      ]
    },
    "what_is_this": {
      "id": "what_is_this",
      "stage": "Immediate Objection",
      "goal": "Briefly explain without pitching the front desk.",
      "sayThis": "It is about missed-call recovery and booking support for Miami med spas. Avalora helps catch patient inquiries when the team is busy, closed, or overloaded, then hands clean notes back to staff.\n\nWho usually handles that workflow there?",
      "branchButtons": [
        {
          "id": "transfer",
          "label": "They transfer",
          "target": "transfer"
        },
        {
          "id": "busy",
          "label": "Owner is busy",
          "target": "busy"
        },
        {
          "id": "send_info",
          "label": "Send info",
          "target": "send_info"
        }
      ]
    },
    "is_sales": {
      "id": "is_sales",
      "stage": "Immediate Objection",
      "goal": "Honest but low-pressure redirect.",
      "sayThis": "It is an outreach call, but I am not trying to pitch the front desk. I am trying to find the right person for patient inquiry recovery and front-desk overflow.\n\nWho would oversee that - the owner, manager, or operations?",
      "branchButtons": [
        {
          "id": "transfer",
          "label": "They transfer",
          "target": "transfer"
        },
        {
          "id": "busy",
          "label": "Owner is busy",
          "target": "busy"
        },
        {
          "id": "send_info",
          "label": "Send info",
          "target": "send_info"
        }
      ]
    },
    "already_have": {
      "id": "already_have",
      "stage": "Immediate Objection",
      "goal": "Support reception, don't replace it.",
      "sayThis": "Absolutely - and Avalora is built to support reception, not replace it.\n\nIt is for missed moments: two calls at once, after-hours inquiries, DMs, forms, or callbacks when the team is busy.\n\nWho handles that side of the workflow?",
      "branchButtons": [
        {
          "id": "transfer",
          "label": "They transfer",
          "target": "transfer"
        },
        {
          "id": "busy",
          "label": "Owner is busy",
          "target": "busy"
        },
        {
          "id": "send_info",
          "label": "Send info",
          "target": "send_info"
        }
      ]
    },
    "not_interested": {
      "id": "not_interested",
      "stage": "Immediate Objection",
      "goal": "One respectful clarification.",
      "sayThis": "Totally fair. Just so I do not leave the wrong impression, this is not about replacing your front desk.\n\nIt is about missed-call and after-hours recovery. Would the owner or manager be the right person to decide whether hearing the short demo is worth it?",
      "branchButtons": [
        {
          "id": "transfer",
          "label": "They transfer",
          "target": "transfer"
        },
        {
          "id": "send_info",
          "label": "Send info",
          "target": "send_info"
        },
        {
          "id": "done",
          "label": "End Call",
          "target": "disposition"
        }
      ]
    },
    "busy": {
      "id": "busy",
      "stage": "Owner / manager is busy or not available",
      "goal": "Get specific callback time and name.",
      "sayThis": "No problem. Who is the best person for patient communication and booking flow? And is there a better time today or tomorrow to reach them?\n\n(If she will not give time): What is the best email to send the short demo and one-line context to, so it gets directly to [Name]?",
      "branchButtons": [
        {
          "id": "data_captured",
          "label": "Got Info / Data Capture",
          "target": "data_capture"
        }
      ]
    },
    "send_info": {
      "id": "send_info",
      "stage": "Send Info Fallback",
      "goal": "Offer demo, get name before email.",
      "sayThis": "Of course. The most useful thing is the short demo because it shows the patient experience and the staff handoff.\n\nBefore I send it, who should I address it to - the owner, practice manager, or whoever handles booking flow?\n\n(After she gives a name):\nPerfect. Is [Name] available for a quick 30 seconds now, or is there a better time today or tomorrow to reach them?",
      "branchButtons": [
        {
          "id": "transfer",
          "label": "She transfers instead",
          "target": "transfer"
        },
        {
          "id": "data_captured",
          "label": "Got Info / Data Capture",
          "target": "data_capture"
        }
      ]
    },
    "more_context": {
      "id": "more_context",
      "stage": "Gatekeeper-Safe Explanation",
      "goal": "Explain the value to the front desk.",
      "sayThis": "Avalora supports busy med spa front desks when patient inquiries come in faster than the team can respond.\n\nIf a call is missed, an after-hours inquiry comes in, a form lead waits, or a booking request is not seen quickly, Avalora helps capture the intent and hand clean details back to staff.\n\nIt is not medical advice, and it is not replacing reception. It is a recovery layer for missed booking moments.",
      "branchButtons": [
        {
          "id": "transfer",
          "label": "Ask for Transfer",
          "target": "transfer"
        },
        {
          "id": "send_info",
          "label": "Send Info",
          "target": "send_info"
        }
      ]
    },
    "transfer": {
      "id": "transfer",
      "stage": "If She Transfers You",
      "goal": "Prepare for Owner.",
      "sayThis": "(Before Transfer):\nThank you - I appreciate it. I will keep it brief.\n\n(When Owner Picks Up):\nHi [Name], thanks for taking the call. [Receptionist Name] connected me.\nI will keep this brief. I am [Name] with Avalora, and I am calling about missed-call and booking recovery for [Clinic Name] - specifically the moments where patient inquiries come in but the front desk cannot always catch them fast enough.\n\nWould it be worth hearing the 20-second version?",
      "branchButtons": [
        {
          "id": "owner_answers",
          "label": "Owner answers -> Switch to Owner Path",
          "target": "owner_answers_placeholder"
        },
        {
          "id": "voicemail",
          "label": "Goes to Voicemail",
          "target": "voicemail"
        }
      ]
    },
    "owner_answers_placeholder": {
      "id": "owner_answers_placeholder",
      "stage": "Connected to Owner",
      "goal": "Switch to Owner Path",
      "sayThis": "--> Switch to Owner / Operator Cold Call Path <--",
      "branchButtons": [
        {
          "id": "disposition",
          "label": "End / Disposition",
          "target": "disposition"
        }
      ]
    },
    "voicemail": {
      "id": "voicemail",
      "stage": "Voicemail",
      "goal": "Leave a 18-25 second voicemail.",
      "sayThis": "Hey, this is [Name] with Avalora. I was calling for whoever handles patient inquiry flow or booking operations for [Clinic Name].\n\nWe work with Miami med spas on missed-call recovery, after-hours capture, and booking support - the moments where patient interest comes in but the front desk cannot always catch it fast enough.\n\nI will try again, and I can also send the short demo if that is easier.",
      "branchButtons": [
        {
          "id": "disposition",
          "label": "End / Disposition",
          "target": "disposition"
        }
      ]
    },
    "data_capture": {
      "id": "data_capture",
      "stage": "Data Capture Before Ending",
      "goal": "Do not end without capturing data.",
      "sayThis": "Capture:\n- Right person name\n- Role/title\n- Direct email\n- Best callback time\n- Permission to send short demo\n\n(If she only gives general inbox):\nThank you. And who should I address it to so it does not land without context?",
      "branchButtons": [
        {
          "id": "pricing_questions",
          "label": "She asks pricing or AI questions",
          "target": "pricing_questions"
        },
        {
          "id": "disposition",
          "label": "End / Disposition",
          "target": "disposition"
        }
      ]
    },
    "pricing_questions": {
      "id": "pricing_questions",
      "stage": "Pricing and Safety Questions",
      "goal": "Do not read the package table to receptionist.",
      "sayThis": "(If Pricing):\nPackages start at $299/month, but pricing depends on call volume, lead volume, and how much recovery workflow the clinic wants handled. I would not want to guess that on a front-desk call. The better first step is the short demo or a 10-15 minute fit call with whoever handles booking flow.\n\n(If AI / Safety):\nAvalora uses voice and workflow technology, but the important part is the outcome: missed-call recovery and clean booking handoff. It does not diagnose or give medical advice. Anything clinical goes back to the clinic team.",
      "branchButtons": [
        {
          "id": "disposition",
          "label": "End / Disposition",
          "target": "disposition"
        }
      ]
    },
    "disposition": {
      "id": "disposition",
      "stage": "Disposition",
      "goal": "Log the call.",
      "sayThis": "Log the call outcome in the CRM:\n- Live transfer\n- Specific callback time\n- Right name + email + demo permission\n- Gatekeeper blocked",
      "branchButtons": []
    }
  }
},
  medspa_owner: {
  "id": "medspa_owner",
  "name": "Owner / Operator Cold Call",
  "workspace": "medspa",
  "initialNode": "opener",
  "nodes": {
    "opener": {
      "id": "opener",
      "stage": "Main Opener",
      "goal": "Earn curiosity and permission to speak.",
      "sayThis": "(Direct Owner Answer):\nHey [Name], this is [Name] with Avalora. I know I am calling unexpectedly - can I give you the quick reason I reached out, and then you can tell me if it is relevant?\n\n(Wait for yes)\n\nI noticed [personalized observation]. Avalora helps Miami med spas recover missed calls, after-hours inquiries, slow callbacks, and booking requests before patients go cold or call another clinic.\n\nWe support the front desk; we do not replace reception.\n\nQuick question: how are missed calls or after-hours booking inquiries handled right now?",
      "branchButtons": [
        {
          "id": "pushback",
          "label": "Early pushback",
          "target": "early_pushback"
        },
        {
          "id": "choose_angle",
          "label": "Choose specific angle",
          "target": "choose_angle"
        },
        {
          "id": "diagnostic",
          "label": "Soft Diagnostic",
          "target": "short_diagnostic"
        }
      ]
    },
    "early_pushback": {
      "id": "early_pushback",
      "stage": "Early Owner Pushback",
      "goal": "Acknowledge, keep it to demo or fit call.",
      "sayThis": "(If \"What is this about?\"):\nIt is about missed-call and booking recovery for med spas - the moments when patient interest comes in but the front desk cannot always catch it fast enough. We support the team; we do not replace reception. Would it be worth hearing the 20-second version?\n\n(If \"Is this a sales call?\"):\nIt is outreach, yes - but I am not calling to hard-pitch you. I am calling because Avalora helps med spas recover missed booking moments, and the easiest first step is just hearing the short demo to see if it is relevant.\n\n(If \"I am busy\"):\nCompletely understand. I will not try to squeeze a pitch into a bad time. The short version is: we help recover missed calls, after-hours inquiries, and booking requests before patients go cold. Would it be better if I sent the demo and followed up tomorrow, or should we find 10 minutes later today?",
      "branchButtons": [
        {
          "id": "choose_angle",
          "label": "Owner allows you to continue",
          "target": "choose_angle"
        },
        {
          "id": "demo_close",
          "label": "Jump to Demo Close",
          "target": "demo_close"
        },
        {
          "id": "disposition",
          "label": "End Call",
          "target": "disposition"
        }
      ]
    },
    "choose_angle": {
      "id": "choose_angle",
      "stage": "20-Second Reason for Calling",
      "goal": "Choose the version that matches the research capsule.",
      "sayThis": "Select the most relevant angle:",
      "branchButtons": [
        {
          "id": "angle_missed_call",
          "label": "Missed-call recovery",
          "target": "angle_missed_call"
        },
        {
          "id": "angle_speed",
          "label": "Speed-to-lead",
          "target": "angle_speed"
        },
        {
          "id": "angle_after_hours",
          "label": "After-hours capture",
          "target": "angle_after_hours"
        },
        {
          "id": "angle_roi",
          "label": "Marketing ROI protection",
          "target": "angle_roi"
        },
        {
          "id": "angle_front_desk",
          "label": "Front-desk overflow",
          "target": "angle_front_desk"
        }
      ]
    },
    "angle_missed_call": {
      "id": "angle_missed_call",
      "stage": "Angle: Missed-call recovery",
      "goal": "Highlight the leak.",
      "sayThis": "The reason I called is that a lot of med spas are already creating patient interest, but the leak happens when calls are missed, callbacks are delayed, or booking requests never become clean staff tasks. Avalora helps recover those missed booking moments before the patient goes cold.",
      "branchButtons": [
        {
          "id": "diagnostic",
          "label": "Diagnostic",
          "target": "short_diagnostic"
        }
      ]
    },
    "angle_speed": {
      "id": "angle_speed",
      "stage": "Angle: Speed-to-lead",
      "goal": "Highlight response speed.",
      "sayThis": "For high-intent services like Botox, filler, laser, or body treatments, response speed matters. If a patient reaches voicemail or waits too long, they may call another clinic. Avalora helps catch that inquiry while the buying intent is still fresh.",
      "branchButtons": [
        {
          "id": "diagnostic",
          "label": "Diagnostic",
          "target": "short_diagnostic"
        }
      ]
    },
    "angle_after_hours": {
      "id": "angle_after_hours",
      "stage": "Angle: After-hours capture",
      "goal": "Highlight closed hours.",
      "sayThis": "A lot of patient interest happens after the clinic is closed - evenings, weekends, or when people are scrolling Instagram. Avalora helps capture those after-hours inquiries instead of letting them sit in voicemail or DMs.",
      "branchButtons": [
        {
          "id": "diagnostic",
          "label": "Diagnostic",
          "target": "short_diagnostic"
        }
      ]
    },
    "angle_roi": {
      "id": "angle_roi",
      "stage": "Angle: Marketing ROI",
      "goal": "Highlight protecting demand.",
      "sayThis": "If a clinic is investing in Instagram, Google, referrals, or ads, the response system becomes part of the ROI. Avalora helps protect the demand after it arrives - missed calls, forms, DMs, and booking requests.",
      "branchButtons": [
        {
          "id": "diagnostic",
          "label": "Diagnostic",
          "target": "short_diagnostic"
        }
      ]
    },
    "angle_front_desk": {
      "id": "angle_front_desk",
      "stage": "Angle: Front-desk overflow",
      "goal": "Highlight front desk load.",
      "sayThis": "Even a great receptionist cannot answer two calls, check out a patient, reply to a DM, and follow up with a form lead at the same time. Avalora supports the front desk during overflow, after-hours, and slow-response moments.",
      "branchButtons": [
        {
          "id": "diagnostic",
          "label": "Diagnostic",
          "target": "short_diagnostic"
        }
      ]
    },
    "short_diagnostic": {
      "id": "short_diagnostic",
      "stage": "Short Diagnostic",
      "goal": "Ask 1-3 questions max. Do not interrogate.",
      "sayThis": "Ask one:\n1) How are missed calls or after-hours inquiries handled right now?\n2) When a Botox/filler/laser inquiry comes in while the team is busy, does it usually become a clean task for staff, or can it sit in voicemail, forms, or DMs?\n3) Do you know roughly how fast new inquiries are called or texted back when the front desk is with patients?\n4) If a serious patient calls after hours, what is the next step they experience?",
      "branchButtons": [
        {
          "id": "buying_signals",
          "label": "Buying signal -> Demo Close",
          "target": "demo_close"
        },
        {
          "id": "owner_objections",
          "label": "Objection / Pushback",
          "target": "owner_objections"
        }
      ]
    },
    "owner_objections": {
      "id": "owner_objections",
      "stage": "Owner Objections",
      "goal": "Acknowledge -> Reframe -> Redirect to demo.",
      "sayThis": "(If \"We already have a receptionist\"):\nThat is exactly who Avalora is built to support. Most good clinics already have a front desk. The gap is the moments no receptionist can physically catch in real time - two calls at once, patient checkout, lunch rush, DMs, forms, after-hours inquiries. Avalora helps recover those moments.\n\n(If \"We already have a CRM\"):\nGreat - Avalora is not trying to replace that. A CRM helps after the lead is captured. Avalora helps catch the inquiry before it disappears... then routes it cleanly to your workflow.\n\n(If \"We do not want AI answering\"):\nCompletely fair. Most owners do not want a cheap AI voice touching their brand. That is why we do not lead with AI. The clinic controls approved answers, escalation rules, and handoff.",
      "branchButtons": [
        {
          "id": "demo_close",
          "label": "Demo Close",
          "target": "demo_close"
        },
        {
          "id": "pricing",
          "label": "Pricing Question",
          "target": "pricing_reference"
        },
        {
          "id": "disposition",
          "label": "End Call",
          "target": "disposition"
        }
      ]
    },
    "pricing_reference": {
      "id": "pricing_reference",
      "stage": "Pricing Question",
      "goal": "Provide range, defer to fit.",
      "sayThis": "Packages start at $299/month and scale based on call volume, lead volume, and how much recovery workflow the clinic wants handled.\n\nMost clinics choose based on whether they need missed-call recovery, after-hours capture, ad/form/DM follow-up, or broader overflow support.\n\nThe first step is seeing whether there is a real missed-call or lead-response gap before recommending a package.",
      "branchButtons": [
        {
          "id": "demo_close",
          "label": "Demo Close",
          "target": "demo_close"
        },
        {
          "id": "fit_call",
          "label": "Fit Call Close",
          "target": "fit_call_close"
        }
      ]
    },
    "demo_close": {
      "id": "demo_close",
      "stage": "Demo Close",
      "goal": "Offer short demo or fit call as next step.",
      "sayThis": "The easiest way to judge Avalora is not for me to over-explain it.\n\nThe demo is short, and you can hear how a real med spa inquiry is handled, how booking intent is captured, and how the details get handed back to staff.\n\nWould it be worth hearing the short demo first, so you can decide if this fits your front-desk workflow?",
      "branchButtons": [
        {
          "id": "send_demo",
          "label": "Owner wants it sent",
          "target": "send_demo"
        },
        {
          "id": "fit_call",
          "label": "Move to Fit Call",
          "target": "fit_call_close"
        }
      ]
    },
    "send_demo": {
      "id": "send_demo",
      "stage": "Send Demo",
      "goal": "Confirm email and set follow-up.",
      "sayThis": "Absolutely. I will send the short demo and website with a quick note so it has context.\n\nTo make sure it does not just sit in your inbox, should I follow up tomorrow or the next day after you have had a chance to hear it?",
      "branchButtons": [
        {
          "id": "disposition",
          "label": "End Call",
          "target": "disposition"
        }
      ]
    },
    "fit_call_close": {
      "id": "fit_call_close",
      "stage": "Fit Call Close",
      "goal": "Schedule the 10-15 min call.",
      "sayThis": "A full pitch would not make sense right now. The better step is a 10-15 minute private fit call where we look at your call volume, booking flow, after-hours needs, and whether recovery is even relevant.\n\nWould later today or tomorrow be better?",
      "branchButtons": [
        {
          "id": "disposition",
          "label": "End Call",
          "target": "disposition"
        }
      ]
    },
    "disposition": {
      "id": "disposition",
      "stage": "Disposition",
      "goal": "Log the call.",
      "sayThis": "Log the call outcome in the CRM.",
      "branchButtons": []
    }
  }
},
  fit_call: {
  "id": "fit_call",
  "name": "15-Minute Fit Call",
  "workspace": "medspa",
  "initialNode": "opener",
  "nodes": {
    "opener": {
      "id": "opener",
      "stage": "Opening & Light Intro",
      "goal": "Open warm, calm, and direct. Introduce Avalora lightly.",
      "sayThis": "\"Before I explain Avalora, I want to understand what made this worth looking at for your clinic.\n\nIf it looks relevant, I'll suggest a proper walkthrough built around your exact front-desk flow. If not, I'll tell you directly.\"\n\n(Light Avalora intro):\n\"Avalora helps med spas capture missed calls, after-hours inquiries, bilingual callers, and front-desk overflow without replacing their current team.\"",
      "branchButtons": [
        {
          "id": "q_why_now",
          "label": "Question 1: Why now?",
          "target": "q_why_now"
        }
      ]
    },
    "q_why_now": {
      "id": "q_why_now",
      "stage": "Question 1: Why now?",
      "goal": "Understand why the clinic is interested now.",
      "sayThis": "\"What made you interested in looking at something like this right now?\"\n\nListen for:\n- A recent problem\n- Missed calls\n- Front desk pressure\n- After-hours leads\n- Slow follow-up\n- Owner stress\n- Paid leads not converting\n- Spanish / bilingual pressure\n- Staff shortage",
      "branchButtons": [
        {
          "id": "q_bottleneck",
          "label": "Question 2: Main bottleneck",
          "target": "q_bottleneck"
        }
      ]
    },
    "q_bottleneck": {
      "id": "q_bottleneck",
      "stage": "Question 2: Main bottleneck",
      "goal": "Find where the front desk feels stretched.",
      "sayThis": "\"Where does your front desk feel most stretched right now — calls, DMs, booking, reschedules, follow-up, or after-hours?\"\n\nIf calls/front desk pressure comes up, ask:\n\"When the clinic gets busy and the front desk is with a patient, what usually happens to new calls?\"",
      "branchButtons": [
        {
          "id": "q_caller_type",
          "label": "Question 4: Caller type",
          "target": "q_caller_type"
        }
      ]
    },
    "q_caller_type": {
      "id": "q_caller_type",
      "stage": "Question 4: Caller type",
      "goal": "Find the exact scenario for the Demo Zoom.",
      "sayThis": "\"What type of caller is that usually — a new consult, pricing question, booking request, reschedule, Spanish caller, or something else?\"\n\nMid-call mirror — required:\n\"Before moving into the close, pause and summarize what they said. 'Let me make sure I'm understanding this correctly. It sounds like the issue is not that your team is careless — it is that [calls / DMs / after-hours / follow-up] can come in at moments when the front desk is already handling patients. So the opportunity is really to catch those booking moments faster and hand clean details back to your team. Is that right?'\"",
      "branchButtons": [
        {
          "id": "q_owner_burden",
          "label": "Question 5: Owner burden",
          "target": "q_owner_burden"
        },
        {
          "id": "q_after_hours",
          "label": "Question 6: After-hours",
          "target": "q_after_hours"
        }
      ]
    },
    "q_owner_burden": {
      "id": "q_owner_burden",
      "stage": "Question 5: Owner burden",
      "goal": "Reveal emotional burden. Ask only if owner seems involved.",
      "sayThis": "\"Does your team fully own that follow-up now, or do you still find yourself checking calls, DMs, or leads sometimes?\"",
      "branchButtons": [
        {
          "id": "q_after_hours",
          "label": "Question 6: After-hours",
          "target": "q_after_hours"
        }
      ]
    },
    "q_after_hours": {
      "id": "q_after_hours",
      "stage": "Question 6: After-hours",
      "goal": "Check evening/weekend lead capture.",
      "sayThis": "\"And after closing, what usually happens if someone calls or sends an inquiry?\"",
      "branchButtons": [
        {
          "id": "q_bilingual",
          "label": "Question 7: Bilingual",
          "target": "q_bilingual"
        },
        {
          "id": "q_lead_source",
          "label": "Question 8: Lead source",
          "target": "q_lead_source"
        }
      ]
    },
    "q_bilingual": {
      "id": "q_bilingual",
      "stage": "Question 7: Bilingual",
      "goal": "Check Spanish demand. Ask only if there is a signal.",
      "sayThis": "\"Do you get many Spanish-speaking callers, or patients who are more comfortable starting in Spanish?\"",
      "branchButtons": [
        {
          "id": "q_lead_source",
          "label": "Question 8: Lead source",
          "target": "q_lead_source"
        }
      ]
    },
    "q_lead_source": {
      "id": "q_lead_source",
      "stage": "Question 8: Lead source + key service",
      "goal": "Find which service should anchor the Demo.",
      "sayThis": "\"Where are most new inquiries coming from right now — Instagram, Google, referrals, ads, website, or a mix?\"\n\n\"Which service are you most focused on growing or protecting right now?\"",
      "branchButtons": [
        {
          "id": "q_scenario",
          "label": "Question 10: Walkthrough scenario",
          "target": "q_scenario"
        }
      ]
    },
    "q_scenario": {
      "id": "q_scenario",
      "stage": "Question 10: Preferred scenario",
      "goal": "Get the headline for the Demo Zoom.",
      "sayThis": "\"For the walkthrough, what would be most useful for you to see or hear Avalora handle — after-hours, missed calls, Spanish callers, Botox/filler booking, pricing questions, reschedules, or follow-up?\"\n\nWalkthrough bridge:\n\"The reason I would not try to explain all of this here is that it is much easier to judge when you see the exact scenario. On the walkthrough, we can build it around [their pain] and [their service], so you can hear how Avalora would handle it and what your team would receive.\n\nFor the walkthrough, what booking or CRM system should we keep in mind?\"",
      "branchButtons": [
        {
          "id": "q_attendees",
          "label": "Question 11: Who should attend?",
          "target": "q_attendees"
        }
      ]
    },
    "q_attendees": {
      "id": "q_attendees",
      "stage": "Question 11: Who should attend?",
      "goal": "Find decision-makers.",
      "sayThis": "\"For that walkthrough, should anyone else be there with you — owner, office manager, front desk lead, or whoever helps approve patient communication and workflow?\"",
      "branchButtons": [
        {
          "id": "close_call",
          "label": "11. Closing the call",
          "target": "close_call"
        }
      ]
    },
    "close_call": {
      "id": "close_call",
      "stage": "Closing the 15-minute call",
      "goal": "Book the time confidently.",
      "sayThis": "\"Based on what you shared, I do think this is worth showing properly — especially around [their exact issue]. The walkthrough would be specific to your clinic, not a generic demo. We would show the patient scenario, how Avalora captures the inquiry, what gets handed back to your team, and where it fits around your current booking flow.\n\nWould tomorrow or the next day be better?\"",
      "branchButtons": [
        {
          "id": "disposition",
          "label": "End / Disposition",
          "target": "disposition"
        }
      ]
    },
    "disposition": {
      "id": "disposition",
      "stage": "After-call Action",
      "goal": "Send immediately after the call.",
      "sayThis": "Send message:\nSubject: Avalora walkthrough confirmed\n\n- Thank them.\n- Reference their exact pain.\n- Confirm date/time.\n- Mention what the walkthrough will cover.\n- Include calendar invite / Zoom link / website.\n\nDo NOT send onboarding page.",
      "branchButtons": []
    }
  }
},
  sales_demo: {
  "id": "sales_demo",
  "name": "40-45 Minute Sales/Demo",
  "workspace": "medspa",
  "initialNode": "reanchor",
  "nodes": {
    "reanchor": {
      "id": "reanchor",
      "stage": "Section 1 — Re-anchor their problem",
      "goal": "Make them feel heard immediately.",
      "sayThis": "\"Today I'll keep this focused on the issue you mentioned: after-hours inquiries, front desk overflow, and making sure Botox/filler consults do not go cold before your team can respond.\"",
      "branchButtons": [
        {
          "id": "revenue_leak",
          "label": "Section 2 — Show revenue leak",
          "target": "revenue_leak"
        }
      ]
    },
    "revenue_leak": {
      "id": "revenue_leak",
      "stage": "Section 2 — Show the revenue leak",
      "goal": "Show conservative math.",
      "sayThis": "Show a simple visual. Use their situation (missed calls, after-hours, etc).\n\nFormula:\nMissed/uncaptured calls per month × conservative conversion rate × average consult/treatment value = potential monthly leakage.\n\nUse language like: \"conservative estimate\", \"directional math\", \"not a promise\".",
      "branchButtons": [
        {
          "id": "live_demo",
          "label": "Section 3 — Personalized demo",
          "target": "live_demo"
        }
      ]
    },
    "live_demo": {
      "id": "live_demo",
      "stage": "Section 3 — Personalized live demo",
      "goal": "Show how Avalora handles a real inquiry.",
      "sayThis": "Play the customized demo (e.g. Botox consult, filler questions, Spanish caller, or lead callback from ads).\n\n\"This would work in your clinic.\"",
      "branchButtons": [
        {
          "id": "workflow",
          "label": "Section 4 — Show workflow fit",
          "target": "workflow"
        }
      ]
    },
    "workflow": {
      "id": "workflow",
      "stage": "Section 4 — Show how it fits workflow",
      "goal": "Show the handoff and staff control.",
      "sayThis": "Show:\n1. Patient calls / submits inquiry.\n2. Front desk answers if available.\n3. Avalora catches overflow, after-hours, or lead callback.\n4. Avalora handles the inquiry safely.\n5. Avalora books, routes, or sends a polished summary based on clinic preference.\n6. Staff stays in control.\n\nSay: booking system, call summary, staff notification, CRM sync.",
      "branchButtons": [
        {
          "id": "safety",
          "label": "Section 5 — Safety & boundaries",
          "target": "safety"
        }
      ]
    },
    "safety": {
      "id": "safety",
      "stage": "Section 5 — Safety & boundaries",
      "goal": "Address HIPAA and medical boundaries before pricing.",
      "sayThis": "Show this clearly:\n- Avalora does not diagnose.\n- Avalora does not prescribe.\n- Avalora does not give medical advice.\n- Avalora handles general booking and intake.\n- Avalora escalates urgent or clinical concerns.\n- Avalora collects only necessary information.\n- Avalora uses BAA / data handling documents where required.\n- Clinic approves tone and boundaries before go-live.",
      "branchButtons": [
        {
          "id": "pause",
          "label": "Section 6 — Pause for objections",
          "target": "pause"
        }
      ]
    },
    "pause": {
      "id": "pause",
      "stage": "Section 6 — Pause for objections",
      "goal": "Stop presenting. Let them react.",
      "sayThis": "Trial close:\n\"From what you've seen, does this feel like the kind of support your front desk could actually use?\"\n\n\"If we started with [after-hours / overflow / lead callback], would that solve the main issue you wanted to fix?\"\n\nThe best frame:\n\"That is exactly why we approve tone, boundaries, and workflow before anything goes live.\"",
      "branchButtons": [
        {
          "id": "activation",
          "label": "Final take: Activation area",
          "target": "activation"
        }
      ]
    },
    "activation": {
      "id": "activation",
      "stage": "Final take: First deployment & Booking mode",
      "goal": "Determine launch setup.",
      "sayThis": "Question 1: \"For launch, where would you want Avalora to step in first — after-hours, overflow during business hours, lead callback, or all three?\"\n\nQuestion 2: \"For the first version, would you want Avalora to book appointments directly, or would you rather it capture and qualify the caller first, then send your front desk a polished summary?\"",
      "branchButtons": [
        {
          "id": "package",
          "label": "Section 5 — Package recommendation",
          "target": "package"
        }
      ]
    },
    "package": {
      "id": "package",
      "stage": "Section 5 — Package recommendation",
      "goal": "Recommend the right package based on needs.",
      "sayThis": "Recommend the package:\n- Entry Recovery: $299/mo (350 min) - after-hours only / very small volume\n- Starter: $549/mo (750 min) - light overflow + after-hours\n- Core: $849/mo (1,500 min) - serious single-location med spa\n- Growth: $1,299/mo (2,500 min) - high inbound volume / ads",
      "branchButtons": [
        {
          "id": "close",
          "label": "After package recommendation",
          "target": "close"
        }
      ]
    },
    "close": {
      "id": "close",
      "stage": "After package recommendation + verbal yes",
      "goal": "Send Activation Link.",
      "sayThis": "Send Personalized Activation Link (Order Form, SLA, BAA, AI Boundary Policy, Security Overview, Notice Language, CRM Auth).\n\nAfter signature, send Stripe payment link.\n\nImmediately book: 45-minute Concierge Onboarding Call (ideally next day).",
      "branchButtons": [
        {
          "id": "disposition",
          "label": "End / Disposition",
          "target": "disposition"
        }
      ]
    },
    "disposition": {
      "id": "disposition",
      "stage": "Disposition",
      "goal": "Log the call.",
      "sayThis": "Log the call outcome in the CRM.",
      "branchButtons": []
    }
  }
},
  partner_gatekeeper: {
  "id": "partner_gatekeeper",
  "name": "Partner Gatekeeper",
  "workspace": "partner",
  "initialNode": "opener",
  "nodes": {
    "opener": {
      "id": "opener",
      "stage": "Main Gatekeeper Opener",
      "goal": "Get to the decision-maker or get the best way to send the short demo.",
      "sayThis": "\"Hey, maybe you can help me out for a second.\n\nI'm trying to reach [Name]. This is Burhan with Avalora.\n\nIt's not a patient call or anything urgent. I'm reaching out because we're building a small referral partner circle around Miami med spas and aesthetic clinics, and I wanted to get a short demo in front of [Name] to see if it's relevant to their network.\n\nWould [Name] be the right person for that?\"",
      "branchButtons": [
        {
          "id": "what_is_this",
          "label": "What Is This Regarding?",
          "target": "what_is_this"
        },
        {
          "id": "is_sales",
          "label": "Is This a Sales Call?",
          "target": "is_sales"
        },
        {
          "id": "send_info",
          "label": "Send Information",
          "target": "send_info"
        },
        {
          "id": "not_available",
          "label": "[Name] Is Not Available",
          "target": "not_available"
        },
        {
          "id": "do_they_know_you",
          "label": "Do They Know You?",
          "target": "do_they_know_you"
        },
        {
          "id": "push_back",
          "label": "If They Push Back",
          "target": "push_back"
        },
        {
          "id": "clean_transfer",
          "label": "Clean Transfer Ask",
          "target": "clean_transfer"
        }
      ]
    },
    "what_is_this": {
      "id": "what_is_this",
      "stage": "Objection: What is this?",
      "goal": "Brief context, pivot to demo.",
      "sayThis": "\"Of course.\n\nAvalora helps Miami med spas recover missed calls, after-hours inquiries, and booking requests before patients go cold.\n\nBut I'm not calling to sell [Name] anything. It's more of a partner conversation — if they know clinics where this is useful, there's a simple partner thank-you when an introduced clinic becomes a paid client.\n\nThe first step is just getting the short demo in front of them.\"\n\nThen ask:\n\"Would it be best to transfer me, or is there a better email for that?\"",
      "branchButtons": [
        {
          "id": "back",
          "label": "Back to Opener",
          "target": "opener"
        }
      ]
    },
    "is_sales": {
      "id": "is_sales",
      "stage": "Objection: Is this sales?",
      "goal": "Reframe as partner conversation.",
      "sayThis": "\"Not really in the normal sense.\n\nI'm not calling to sell [Name] a service for their company.\n\nIt's more of a referral partner conversation. We want to show a short demo first, and if it feels useful for clinics in their network, we can talk about introductions later.\"\n\nThen ask:\n\"Would [Name] usually handle something like that?\"",
      "branchButtons": [
        {
          "id": "back",
          "label": "Back to Opener",
          "target": "opener"
        }
      ]
    },
    "send_info": {
      "id": "send_info",
      "stage": "Response: Send Info",
      "goal": "Get email and direct contact name.",
      "sayThis": "\"Sure, I can do that.\n\nWhat's the best email to send the short demo and context to?\n\nAnd should I address it directly to [Name]?\"\n\nAfter they give email:\n\"Perfect. And just so I don't send it into the wrong place — is [Name] the right person for partner conversations, or is there someone else who handles relationships like this?\"",
      "branchButtons": [
        {
          "id": "back",
          "label": "Back to Opener",
          "target": "opener"
        }
      ]
    },
    "not_available": {
      "id": "not_available",
      "stage": "Response: Not available",
      "goal": "Find best way to send demo.",
      "sayThis": "\"No problem.\n\nWhat's the best way to get a short demo and note in front of them?\n\nI don't want to send a long pitch — it's just a quick partner demo for clinics in the aesthetic space.\"\n\nThen ask:\n\"Would email be best, or should I call back at a better time?\"",
      "branchButtons": [
        {
          "id": "back",
          "label": "Back to Opener",
          "target": "opener"
        }
      ]
    },
    "do_they_know_you": {
      "id": "do_they_know_you",
      "stage": "Objection: Do they know you?",
      "goal": "Honest direct answer.",
      "sayThis": "\"Not yet.\n\nThat's why I'm being direct. I came across [Company] because of their work in the aesthetic space, and I thought Avalora may be relevant as a partner resource.\n\nI just wanted to get the demo in front of [Name] first before asking for any type of conversation.\"",
      "branchButtons": [
        {
          "id": "back",
          "label": "Back to Opener",
          "target": "opener"
        }
      ]
    },
    "push_back": {
      "id": "push_back",
      "stage": "Response: Push back",
      "goal": "De-escalate.",
      "sayThis": "\"I understand.\n\nI don't want to waste anyone's time. The only reason I reached out is because Avalora is specifically focused on Miami med spas, missed-call recovery, and booking support.\n\nIf it is not relevant, no problem.\n\nWho would be the best person to decide whether this is worth looking at?\"",
      "branchButtons": [
        {
          "id": "back",
          "label": "Back to Opener",
          "target": "opener"
        }
      ]
    },
    "clean_transfer": {
      "id": "clean_transfer",
      "stage": "Transfer Ask",
      "goal": "Ask for the transfer directly.",
      "sayThis": "Option 1:\n\"Would you be able to connect me with [Name] for a quick minute?\"\n\nOption 2:\n\"What's the cleanest way to get this in front of [Name]?\"\n\nOption 3:\n\"Should I send the demo to you, or directly to [Name]?\"",
      "branchButtons": [
        {
          "id": "back",
          "label": "Back to Opener",
          "target": "opener"
        }
      ]
    }
  }
},
  partner_live: {
  "id": "partner_live",
  "name": "Partner Live Call",
  "workspace": "partner",
  "initialNode": "opener",
  "nodes": {
    "opener": {
      "id": "opener",
      "stage": "Main Opener",
      "goal": "Earn 20 seconds.",
      "sayThis": "\"Hey [Name], it's Burhan with Avalora.\n\nI know I'm calling unexpectedly — can I give you the 20-second reason I reached out, and then you can tell me if it's worth continuing?\"\n\n(Pause. If yes:)\n\n\"I came across [personalized detail about their company / website / service], and it looks like you already sit close to the aesthetic or med spa world.\n\nAvalora helps Miami med spas recover missed calls, after-hours inquiries, and booking requests their front desk can't always catch fast enough.\n\nThe reason I called you specifically is we're building a small referral partner circle.\n\nYou would not have to sell anything, manage anything, or support the clinic. If you ever introduce a clinic that becomes a paid Avalora client, we send a one-time partner thank-you.\n\nI'm not asking for names on this call. I just wanted to show you the short demo first, so you can decide if this is even something you'd feel comfortable mentioning to the right clinic.\n\nDoes that make sense?\"",
      "branchButtons": [
        {
          "id": "what_is_avalora",
          "label": "What Is Avalora?",
          "target": "what_is_avalora"
        },
        {
          "id": "why_calling_me",
          "label": "Why Are You Calling Me?",
          "target": "why_calling_me"
        },
        {
          "id": "what_do_you_want",
          "label": "What Do You Want From Me?",
          "target": "what_do_you_want"
        },
        {
          "id": "whats_in_it",
          "label": "What's In It For Me?",
          "target": "whats_in_it"
        },
        {
          "id": "clean_explanation",
          "label": "Clean Explanation",
          "target": "clean_explanation"
        },
        {
          "id": "qualification",
          "label": "Light Qualification",
          "target": "qualification"
        },
        {
          "id": "demo_close",
          "label": "Main Demo Close",
          "target": "demo_close"
        }
      ]
    },
    "what_is_avalora": {
      "id": "what_is_avalora",
      "stage": "Question: What is Avalora?",
      "goal": "Explain the value safely.",
      "sayThis": "\"Of course.\n\nAvalora is a bilingual call and booking recovery company for Miami med spas.\n\nThe simple version is this: when a clinic misses a call, responds late, gets an after-hours inquiry, or has a booking request sitting somewhere, Avalora helps capture that patient before they go cold or call another clinic.\n\nWe support the front desk. We do not replace the receptionist.\n\nThe clinic stays in control with approved FAQs, booking rules, and handoff preferences.\"\n\nThen ask:\n\"The reason I reached out to you is the partner side. Would it be worth hearing the short demo first, just to see if it is something you'd ever want to introduce?\"",
      "branchButtons": [
        {
          "id": "demo_close",
          "label": "To Demo Close",
          "target": "demo_close"
        }
      ]
    },
    "why_calling_me": {
      "id": "why_calling_me",
      "stage": "Question: Why me?",
      "goal": "Explain the partner fit.",
      "sayThis": "\"Fair question.\n\nI called because from what I saw, you already work around the aesthetic space, and we are being careful about who we speak with on the partner side.\n\nWe are not looking for random lead lists.\n\nWe are looking for trusted people who may know clinics where missed calls, after-hours inquiries, or slow follow-up are already costing bookings.\n\nIf you hear the demo and it feels useful, great. If not, no pressure.\"\n\nThen ask:\n\"Would it be worth hearing it first?\"",
      "branchButtons": [
        {
          "id": "demo_close",
          "label": "To Demo Close",
          "target": "demo_close"
        }
      ]
    },
    "what_do_you_want": {
      "id": "what_do_you_want",
      "stage": "Question: What do you want?",
      "goal": "Keep it simple and demo-first.",
      "sayThis": "\"Right now, only one thing: hear the short demo and tell me if this would be useful for anyone in your world.\n\nIf it is not a fit, no problem.\n\nIf it is a fit and one clinic comes to mind later, we can make the introduction simple.\n\nYou do not have to sell it, explain it, or support it.\"\n\nThen pause.",
      "branchButtons": [
        {
          "id": "demo_close",
          "label": "To Demo Close",
          "target": "demo_close"
        }
      ]
    },
    "whats_in_it": {
      "id": "whats_in_it",
      "stage": "Question: What is in it for me?",
      "goal": "Share the upside without leading with it.",
      "sayThis": "\"Two things.\n\nFirst, this can make you useful to the right clinic because missed calls and slow follow-up are real revenue leaks.\n\nSecond, if a clinic is introduced through you and becomes a paid Avalora client, we send a one-time partner thank-you after the first payment clears.\n\nBut I do not want to lead with the money. The first thing is whether you would actually feel comfortable putting your name near this.\n\nThat is why the demo comes first.\"\n\nThen ask:\n\"Want me to show you how it sounds?\"",
      "branchButtons": [
        {
          "id": "demo_close",
          "label": "To Demo Close",
          "target": "demo_close"
        }
      ]
    },
    "clean_explanation": {
      "id": "clean_explanation",
      "stage": "Clean Explanation",
      "goal": "Proper explanation if needed.",
      "sayThis": "\"Avalora helps Miami med spas catch the patient opportunities that usually fall through the cracks.\n\nThat includes missed calls, after-hours inquiries, slow callbacks, website leads, DMs, and booking requests.\n\nWe are not a generic AI bot, and we are not replacing the receptionist.\n\nWe are a recovery layer around the front desk, so when the team is busy, closed, overloaded, or slow to respond, the patient still gets captured and handed off cleanly.\"\n\nShort Version:\n\"Avalora helps med spas recover the missed booking moments before the patient goes cold.\"",
      "branchButtons": [
        {
          "id": "demo_close",
          "label": "To Demo Close",
          "target": "demo_close"
        }
      ]
    },
    "qualification": {
      "id": "qualification",
      "stage": "Light Qualification",
      "goal": "Check if they are a real partner candidate.",
      "sayThis": "\"Do you mostly work around med spas, aesthetic clinics, injectors, or broader healthcare practices?\"\n\n\"Are the clinics you come across usually trying to grow patient volume?\"\n\n\"Do you ever hear clinics mention missed calls, front-desk overload, or slow lead follow-up?\"\n\n\"Would you be open to mentioning a resource like this if the demo felt strong and the fit was obvious?\"\n\n\"Are you personally allowed to receive referral thank-yous, or does your company have a policy against that?\"\n\nIf they answer positively, move to demo.",
      "branchButtons": [
        {
          "id": "demo_close",
          "label": "To Demo Close",
          "target": "demo_close"
        }
      ]
    },
    "demo_close": {
      "id": "demo_close",
      "stage": "Main Demo Close",
      "goal": "Secure the demo.",
      "sayThis": "\"The easiest next step is not for me to over-explain it.\n\nThe demo is short, and you can hear how Avalora handles a real med spa inquiry, captures the booking intent, and hands it off to staff.\n\nWould it be worth hearing that first, so you can decide if this is something you'd feel comfortable mentioning to the right clinic?\"\n\nIf They Say Yes:\n\"Perfect. I can either send it to you or walk you through it quickly. Which is easier?\"\n\nIf Live Walkthrough:\n\"It takes around 10 minutes. Would later today or tomorrow work better?\"\n\nIf Sending:\n\"I'll send the demo with a short note. After you hear it, if one clinic comes to mind, we can talk about a simple intro. If not, no pressure.\"",
      "branchButtons": [
        {
          "id": "objections",
          "label": "Go to Objections",
          "target": "objections"
        }
      ]
    },
    "objections": {
      "id": "objections",
      "stage": "Partner Objections",
      "goal": "Handle objections.",
      "sayThis": "(If \"Our Clients Already Have Receptionists\"):\n\"Absolutely. Avalora is not replacing receptionists. Most clinics already have a front desk. The problem is the missed moments: two calls at once, lunch rush, after-hours inquiries, DMs, booking requests, or slow callbacks. Avalora supports the receptionist by catching what the team cannot always reach fast enough.\" -> \"Would it be useful to hear how that works?\"\n\n(If \"Is This Just an AI Receptionist?\"):\n\"No, and that is not really how we position it. Avalora is lead recovery and booking support for med spas. It is focused on missed calls, after-hours capture, bilingual intake, booking requests, and clean handoff to staff. The clinic stays in control.\"\n\n(If \"Our Clients Already Use a CRM\"):\n\"That makes sense. Avalora is not trying to replace a CRM. A CRM helps after the lead is captured. Avalora helps catch the inquiry before it disappears — missed call, DM, form lead, after-hours request, or booking intent — and then hands it off cleanly.\" -> \"Would it be worth seeing how that handoff works?\"\n\n(If \"Send Me Information\"):\n\"Of course. I can send information, but the demo is more useful than a written explanation because you can actually hear the patient experience. I'll send both: the demo and a short note. If it feels relevant, we can talk. If not, no pressure.\" -> \"What is the best email or number to send it to?\"\n\n(If \"How Much Do You Pay?\"):\n\"We offer a simple one-time partner thank-you after a clinic becomes a paid Avalora client and the first payment clears. The current structure is $125, $225, $350, or $500 depending on the package. But I usually do not lead with that because the main thing is whether you would feel comfortable introducing it.\"",
      "branchButtons": []
    }
  }
}
};
