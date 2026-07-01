const fs = require('fs');

const fit_call = {
  id: 'fit_call',
  name: '15-Minute Fit Call',
  workspace: 'medspa',
  initialNode: 'opener',
  nodes: {
    opener: {
      id: 'opener',
      stage: 'Opening & Light Intro',
      goal: 'Open warm, calm, and direct. Introduce Avalora lightly.',
      sayThis: `"Before I explain Avalora, I want to understand what made this worth looking at for your clinic.\n\nIf it looks relevant, I'll suggest a proper walkthrough built around your exact front-desk flow. If not, I'll tell you directly."\n\n(Light Avalora intro):\n"Avalora helps med spas capture missed calls, after-hours inquiries, bilingual callers, and front-desk overflow without replacing their current team."`,
      branchButtons: [{ id: 'q_why_now', label: 'Question 1: Why now?', target: 'q_why_now' }]
    },
    q_why_now: {
      id: 'q_why_now',
      stage: 'Question 1: Why now?',
      goal: 'Understand why the clinic is interested now.',
      sayThis: `"What made you interested in looking at something like this right now?"\n\nListen for:\n- A recent problem\n- Missed calls\n- Front desk pressure\n- After-hours leads\n- Slow follow-up\n- Owner stress\n- Paid leads not converting\n- Spanish / bilingual pressure\n- Staff shortage`,
      branchButtons: [{ id: 'q_bottleneck', label: 'Question 2: Main bottleneck', target: 'q_bottleneck' }]
    },
    q_bottleneck: {
      id: 'q_bottleneck',
      stage: 'Question 2: Main bottleneck',
      goal: 'Find where the front desk feels stretched.',
      sayThis: `"Where does your front desk feel most stretched right now — calls, DMs, booking, reschedules, follow-up, or after-hours?"\n\nIf calls/front desk pressure comes up, ask:\n"When the clinic gets busy and the front desk is with a patient, what usually happens to new calls?"`,
      branchButtons: [{ id: 'q_caller_type', label: 'Question 4: Caller type', target: 'q_caller_type' }]
    },
    q_caller_type: {
      id: 'q_caller_type',
      stage: 'Question 4: Caller type',
      goal: 'Find the exact scenario for the Demo Zoom.',
      sayThis: `"What type of caller is that usually — a new consult, pricing question, booking request, reschedule, Spanish caller, or something else?"\n\nMid-call mirror — required:\n"Before moving into the close, pause and summarize what they said. 'Let me make sure I'm understanding this correctly. It sounds like the issue is not that your team is careless — it is that [calls / DMs / after-hours / follow-up] can come in at moments when the front desk is already handling patients. So the opportunity is really to catch those booking moments faster and hand clean details back to your team. Is that right?'"`,
      branchButtons: [
        { id: 'q_owner_burden', label: 'Question 5: Owner burden', target: 'q_owner_burden' },
        { id: 'q_after_hours', label: 'Question 6: After-hours', target: 'q_after_hours' }
      ]
    },
    q_owner_burden: {
      id: 'q_owner_burden',
      stage: 'Question 5: Owner burden',
      goal: 'Reveal emotional burden. Ask only if owner seems involved.',
      sayThis: `"Does your team fully own that follow-up now, or do you still find yourself checking calls, DMs, or leads sometimes?"`,
      branchButtons: [{ id: 'q_after_hours', label: 'Question 6: After-hours', target: 'q_after_hours' }]
    },
    q_after_hours: {
      id: 'q_after_hours',
      stage: 'Question 6: After-hours',
      goal: 'Check evening/weekend lead capture.',
      sayThis: `"And after closing, what usually happens if someone calls or sends an inquiry?"`,
      branchButtons: [
        { id: 'q_bilingual', label: 'Question 7: Bilingual', target: 'q_bilingual' },
        { id: 'q_lead_source', label: 'Question 8: Lead source', target: 'q_lead_source' }
      ]
    },
    q_bilingual: {
      id: 'q_bilingual',
      stage: 'Question 7: Bilingual',
      goal: 'Check Spanish demand. Ask only if there is a signal.',
      sayThis: `"Do you get many Spanish-speaking callers, or patients who are more comfortable starting in Spanish?"`,
      branchButtons: [{ id: 'q_lead_source', label: 'Question 8: Lead source', target: 'q_lead_source' }]
    },
    q_lead_source: {
      id: 'q_lead_source',
      stage: 'Question 8: Lead source + key service',
      goal: 'Find which service should anchor the Demo.',
      sayThis: `"Where are most new inquiries coming from right now — Instagram, Google, referrals, ads, website, or a mix?"\n\n"Which service are you most focused on growing or protecting right now?"`,
      branchButtons: [{ id: 'q_scenario', label: 'Question 10: Walkthrough scenario', target: 'q_scenario' }]
    },
    q_scenario: {
      id: 'q_scenario',
      stage: 'Question 10: Preferred scenario',
      goal: 'Get the headline for the Demo Zoom.',
      sayThis: `"For the walkthrough, what would be most useful for you to see or hear Avalora handle — after-hours, missed calls, Spanish callers, Botox/filler booking, pricing questions, reschedules, or follow-up?"\n\nWalkthrough bridge:\n"The reason I would not try to explain all of this here is that it is much easier to judge when you see the exact scenario. On the walkthrough, we can build it around [their pain] and [their service], so you can hear how Avalora would handle it and what your team would receive.\n\nFor the walkthrough, what booking or CRM system should we keep in mind?"`,
      branchButtons: [{ id: 'q_attendees', label: 'Question 11: Who should attend?', target: 'q_attendees' }]
    },
    q_attendees: {
      id: 'q_attendees',
      stage: 'Question 11: Who should attend?',
      goal: 'Find decision-makers.',
      sayThis: `"For that walkthrough, should anyone else be there with you — owner, office manager, front desk lead, or whoever helps approve patient communication and workflow?"`,
      branchButtons: [{ id: 'close_call', label: '11. Closing the call', target: 'close_call' }]
    },
    close_call: {
      id: 'close_call',
      stage: 'Closing the 15-minute call',
      goal: 'Book the time confidently.',
      sayThis: `"Based on what you shared, I do think this is worth showing properly — especially around [their exact issue]. The walkthrough would be specific to your clinic, not a generic demo. We would show the patient scenario, how Avalora captures the inquiry, what gets handed back to your team, and where it fits around your current booking flow.\n\nWould tomorrow or the next day be better?"`,
      branchButtons: [
        { id: 'disposition', label: 'End / Disposition', target: 'disposition' }
      ]
    },
    disposition: {
      id: 'disposition',
      stage: 'After-call Action',
      goal: 'Send immediately after the call.',
      sayThis: `Send message:\nSubject: Avalora walkthrough confirmed\n\n- Thank them.\n- Reference their exact pain.\n- Confirm date/time.\n- Mention what the walkthrough will cover.\n- Include calendar invite / Zoom link / website.\n\nDo NOT send onboarding page.`,
      branchButtons: []
    }
  }
};

const sales_demo = {
  id: 'sales_demo',
  name: '40-45 Minute Sales/Demo',
  workspace: 'medspa',
  initialNode: 'reanchor',
  nodes: {
    reanchor: {
      id: 'reanchor',
      stage: 'Section 1 — Re-anchor their problem',
      goal: 'Make them feel heard immediately.',
      sayThis: `"Today I'll keep this focused on the issue you mentioned: after-hours inquiries, front desk overflow, and making sure Botox/filler consults do not go cold before your team can respond."`,
      branchButtons: [{ id: 'revenue_leak', label: 'Section 2 — Show revenue leak', target: 'revenue_leak' }]
    },
    revenue_leak: {
      id: 'revenue_leak',
      stage: 'Section 2 — Show the revenue leak',
      goal: 'Show conservative math.',
      sayThis: `Show a simple visual. Use their situation (missed calls, after-hours, etc).\n\nFormula:\nMissed/uncaptured calls per month × conservative conversion rate × average consult/treatment value = potential monthly leakage.\n\nUse language like: "conservative estimate", "directional math", "not a promise".`,
      branchButtons: [{ id: 'live_demo', label: 'Section 3 — Personalized demo', target: 'live_demo' }]
    },
    live_demo: {
      id: 'live_demo',
      stage: 'Section 3 — Personalized live demo',
      goal: 'Show how Avalora handles a real inquiry.',
      sayThis: `Play the customized demo (e.g. Botox consult, filler questions, Spanish caller, or lead callback from ads).\n\n"This would work in your clinic."`,
      branchButtons: [{ id: 'workflow', label: 'Section 4 — Show workflow fit', target: 'workflow' }]
    },
    workflow: {
      id: 'workflow',
      stage: 'Section 4 — Show how it fits workflow',
      goal: 'Show the handoff and staff control.',
      sayThis: `Show:\n1. Patient calls / submits inquiry.\n2. Front desk answers if available.\n3. Avalora catches overflow, after-hours, or lead callback.\n4. Avalora handles the inquiry safely.\n5. Avalora books, routes, or sends a polished summary based on clinic preference.\n6. Staff stays in control.\n\nSay: booking system, call summary, staff notification, CRM sync.`,
      branchButtons: [{ id: 'safety', label: 'Section 5 — Safety & boundaries', target: 'safety' }]
    },
    safety: {
      id: 'safety',
      stage: 'Section 5 — Safety & boundaries',
      goal: 'Address HIPAA and medical boundaries before pricing.',
      sayThis: `Show this clearly:\n- Avalora does not diagnose.\n- Avalora does not prescribe.\n- Avalora does not give medical advice.\n- Avalora handles general booking and intake.\n- Avalora escalates urgent or clinical concerns.\n- Avalora collects only necessary information.\n- Avalora uses BAA / data handling documents where required.\n- Clinic approves tone and boundaries before go-live.`,
      branchButtons: [{ id: 'pause', label: 'Section 6 — Pause for objections', target: 'pause' }]
    },
    pause: {
      id: 'pause',
      stage: 'Section 6 — Pause for objections',
      goal: 'Stop presenting. Let them react.',
      sayThis: `Trial close:\n"From what you've seen, does this feel like the kind of support your front desk could actually use?"\n\n"If we started with [after-hours / overflow / lead callback], would that solve the main issue you wanted to fix?"\n\nThe best frame:\n"That is exactly why we approve tone, boundaries, and workflow before anything goes live."`,
      branchButtons: [{ id: 'activation', label: 'Final take: Activation area', target: 'activation' }]
    },
    activation: {
      id: 'activation',
      stage: 'Final take: First deployment & Booking mode',
      goal: 'Determine launch setup.',
      sayThis: `Question 1: "For launch, where would you want Avalora to step in first — after-hours, overflow during business hours, lead callback, or all three?"\n\nQuestion 2: "For the first version, would you want Avalora to book appointments directly, or would you rather it capture and qualify the caller first, then send your front desk a polished summary?"`,
      branchButtons: [{ id: 'package', label: 'Section 5 — Package recommendation', target: 'package' }]
    },
    package: {
      id: 'package',
      stage: 'Section 5 — Package recommendation',
      goal: 'Recommend the right package based on needs.',
      sayThis: `Recommend the package:\n- Entry Recovery: $299/mo (350 min) - after-hours only / very small volume\n- Starter: $549/mo (750 min) - light overflow + after-hours\n- Core: $849/mo (1,500 min) - serious single-location med spa\n- Growth: $1,299/mo (2,500 min) - high inbound volume / ads`,
      branchButtons: [{ id: 'close', label: 'After package recommendation', target: 'close' }]
    },
    close: {
      id: 'close',
      stage: 'After package recommendation + verbal yes',
      goal: 'Send Activation Link.',
      sayThis: `Send Personalized Activation Link (Order Form, SLA, BAA, AI Boundary Policy, Security Overview, Notice Language, CRM Auth).\n\nAfter signature, send Stripe payment link.\n\nImmediately book: 45-minute Concierge Onboarding Call (ideally next day).`,
      branchButtons: [
        { id: 'disposition', label: 'End / Disposition', target: 'disposition' }
      ]
    },
    disposition: {
      id: 'disposition',
      stage: 'Disposition',
      goal: 'Log the call.',
      sayThis: "Log the call outcome in the CRM.",
      branchButtons: []
    }
  }
};

const extraPaths = { fit_call, sales_demo };
fs.writeFileSync('temp_extraPaths.json', JSON.stringify(extraPaths, null, 2));
console.log('done');
