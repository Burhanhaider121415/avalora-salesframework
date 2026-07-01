export type ActionTarget = 'next' | 'back' | string;

export interface OutreachNode {
  id: string;
  stage: string;
  goal: string;
  checklist?: string[];
  fields?: { label: string; placeholder: string }[];
  instruction?: string;
  branchButtons: { id: string; label: string; target: ActionTarget }[];
}

export interface OutreachPath {
  id: string;
  name: string;
  workspace: 'medspa' | 'partner';
  nodes: Record<string, OutreachNode>;
  initialNode: string;
}

export const outreachPaths: Record<string, OutreachPath> = {
  email_mode: {
  "id": "email_mode",
  "name": "Email Copywriter Manual",
  "workspace": "medspa",
  "initialNode": "executive_directive",
  "nodes": {
    "executive_directive": {
      "id": "executive_directive",
      "stage": "1. Executive directive",
      "goal": "Core instruction to the copywriter",
      "instruction": "Build emails that feel researched, human, and operationally useful. The owner should not think, \"another AI vendor.\" She should think, \"they actually looked at my clinic, they understand where booking leakage happens, and this may help my front desk without embarrassing my brand.\"\n\nThe copywriter is not being hired to make clever emails. The copywriter is being hired to convert account intelligence into trust. For Avalora, the email must not look like a blast, a SaaS sequence, or a generic AI pitch.\n\nEvery email should answer the owner's silent questions in seconds:\n- Why are they emailing me specifically?\n- What did they notice about my clinic?\n- What operational problem are they pointing to without judging my team?\n- Why should I reply instead of delete?\n- What is the lowest-friction next step?\n\nThe strategic thesis:\nEmail should be used as a precision follow-up and credibility channel inside Avalora's owner-access system. It should support calling and Instagram, not replace them. The copywriter must write by scenario: after a call, after a voicemail, after Instagram engagement, after a gatekeeper request, after owner-requested info, after demo sent, and after no response.\n\nThe end goal is a 15-minute demo/private fit call, but the first cold email should not always ask directly for a meeting. The right CTA depends on warmth. Cold owners need a reply-safe opening. Warmer owners can be moved toward hearing the demo. Interested owners can be moved toward the 10-15 minute fit call.",
      "branchButtons": [
        {
          "id": "conversion_path",
          "label": "2. Conversion path",
          "target": "conversion_path"
        }
      ]
    },
    "conversion_path": {
      "id": "conversion_path",
      "stage": "2. The conversion path the emails must create",
      "goal": "The email should earn the next conversation, not close the sale.",
      "instruction": "Stage | Owner must think/feel | Copywriter job\n\n- Open: This subject feels specific, normal, and not spammy. | Use plain, relevant, non-clickbait subject logic tied to clinic, city, call/DM leakage, or prior touch.\n- First 3 seconds: They are not sending this to everyone. | Open with one real clinic observation or prior-touch context.\n- Relevance: This connects to patient bookings, not generic software. | Bridge the observation to missed calls, after-hours inquiries, DMs, speed-to-lead, or front-desk overflow.\n- Safety: They are not attacking my receptionist or replacing my team. | Use support language: front-desk relief, overflow, clean handoff, clinic-approved rules.\n- Curiosity: The demo may be worth hearing. | Do not over-explain. Let demo carry proof.\n- Reply: Replying will not trap me in a hard sales process. | Use one soft CTA that feels easy to answer.\n- Book: A short 15-minute call is reasonable. | Only ask for the call once interest, request for info, demo curiosity, or prior conversation exists.\n\nThe email should not try to close the sale. The email should earn the next conversation. If it tries to explain everything, it gives the owner more reasons to ignore it. The best copy creates enough relevance for a reply and enough curiosity for the demo, while preserving Avalora's premium and safe positioning.",
      "branchButtons": [
        {
          "id": "buyer_psychology",
          "label": "3. Buyer psychology",
          "target": "buyer_psychology"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "executive_directive"
        }
      ]
    },
    "buyer_psychology": {
      "id": "buyer_psychology",
      "stage": "3. Buyer psychology the copywriter must respect",
      "goal": "Respect their brand, team, and reputation.",
      "instruction": "The med spa owner is not a normal B2B software buyer. She is protecting a brand, a team, a patient experience, and often her own professional reputation.\n\n- She is busy and may still be treating patients. | Keep emails short enough to understand in 10 seconds.\n- She receives constant vendor noise: SEO, ads, software, staffing, devices, financing. | Avoid sales tricks, inflated claims, and generic openings.\n- She is status-sensitive. | The email must feel premium, specific, and operationally sharp - not cheap or desperate.\n- She fears robotic AI damaging patient trust. | Do not lead with AI. Lead with lead recovery, booking support, front-desk relief, and demo proof.\n- She does not want staff threatened. | Always support the receptionist; never frame staff as the problem.\n- She cares about booked appointments, reviews, follow-up speed, brand experience, and workflow simplicity. | Tie the message to patient booking moments and clean handoff, not features.\n\nThe emotional sequence to create (Required feeling transfer):\nFrom: vendor fatigue and skepticism. To: calm curiosity, operational relevance, and safety. The owner should feel: \"This is specific, respectful, and potentially useful. I can reply without being trapped.\"",
      "branchButtons": [
        {
          "id": "research_card",
          "label": "4. Write from research card",
          "target": "research_card"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "conversion_path"
        }
      ]
    },
    "research_card": {
      "id": "research_card",
      "stage": "4. The copywriter must write from the research card",
      "goal": "Use visible facts, never invent.",
      "instruction": "Document 1 gives the outreach team a research card. The copywriter must not begin from a blank template. He must begin from the card. The card is the source of relevance.\n\nResearch card input -> How copywriter uses it\n- Clinic name + location -> Subject line specificity, opening relevance, local Miami/South Florida awareness.\n- Owner/operator name and role -> Personal greeting and correct decision-maker framing.\n- Recent service/treatment push -> Opening line and first relevance bridge.\n- Booking path -> Mention booking request, call, form, or inquiry capture without accusing.\n- Instagram activity -> Use only if email follows or supports IG context; do not sound creepy.\n- Ad/growth signal -> Use ad-spend protection and speed-to-lead angle.\n- Bilingual signal -> Use English/Spanish intake only if relevant; do not fake Spanish or assume.\n- Review/reputation signal -> Use to match premium tone; avoid sounding like a low-status vendor.\n- Prior touch history -> If called, left voicemail, or sent DM, the email must mention that context.\n- Best angle -> Choose one: missed calls, after-hours, DMs, ads, bilingual, booking flow, front-desk overflow.\n\nNo invented personalization:\nThe copywriter may only use visible facts, prior account history, or details provided by the team. Never write \"I know you are missing calls,\" \"your receptionist is overloaded,\" or \"your ads are failing\" unless the clinic explicitly said so.",
      "branchButtons": [
        {
          "id": "email_chassis",
          "label": "5. Email chassis",
          "target": "email_chassis"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "buyer_psychology"
        }
      ]
    },
    "email_chassis": {
      "id": "email_chassis",
      "stage": "5. Message architecture: the email chassis",
      "goal": "Keep the underlying structure consistent.",
      "instruction": "Every email family can change by scenario, but the underlying chassis should stay consistent.\n\n- Subject line: Earn open without triggering spam or distrust. | Plain, short, specific. No fake urgency, emojis, clickbait, Re:/Fwd:, or AI hype.\n- Opening line: Prove relevance immediately. | Use one real observation or prior-touch context. No generic \"hope you are well.\"\n- Operational bridge: Connect observation to booking leakage. | Use a soft hypothesis: \"made me think about response speed,\" not accusation.\n- Avalora line: Explain simply. | One sentence only: lead recovery and booking support for Miami med spas.\n- Proof/demo bridge: Avoid over-explaining. | Position the demo as the easiest way to judge patient experience, tone, bilingual intake, and handoff.\n- CTA: Create reply or booked call. | One CTA only. Match warmth level: reply, demo, or 10-15 minute call.\n- Signature: Establish credibility without clutter. | Name, Avalora, site if appropriate, professional sign-off. No banners, no attachments.\n\nThe 7-line discipline:\nFor most outbound emails, the copywriter should aim for 5-7 short lines, 50-100 words, and one idea per sentence. If the email needs more explanation, it is probably being sent too early or to the wrong warmth stage.",
      "branchButtons": [
        {
          "id": "subject_line",
          "label": "6. Subject line strategy",
          "target": "subject_line"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "research_card"
        }
      ]
    },
    "subject_line": {
      "id": "subject_line",
      "stage": "6. Subject line strategy",
      "goal": "Create relevance, not deception.",
      "instruction": "Subject lines should feel like a serious operator reaching out, not a marketer trying to force an open. The subject should accurately match the body of the email and should create relevance, not deception.\n\n- Clinic-specific: [Clinic Name] + calls / booking / follow-up / patient inquiries.\n- Prior-touch: Tried calling / quick follow-up / the demo I mentioned.\n- Problem-specific: Missed calls / after-hours inquiries / booking requests.\n- Location-specific: Miami med spa call coverage / after-hours inquiries in Miami.\n- Demo-specific: Short Avalora demo / patient inquiry demo.\n- Gatekeeper-forward: For front desk / booking operations / patient communication.\n\nSubject line banned moves:\n- No fake Re: or Fwd:.\n- No \"urgent,\" \"last chance,\" \"AI revolution,\" \"guaranteed bookings,\" or hype language.\n- No vague curiosity bait that disconnects from the email body.\n- No long subject lines that look automated.\n- No personalization that feels creepy or over-researched.",
      "branchButtons": [
        {
          "id": "personalization",
          "label": "7. Personalization system",
          "target": "personalization"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "email_chassis"
        }
      ]
    },
    "personalization": {
      "id": "personalization",
      "stage": "7. Personalization system for the copywriter",
      "goal": "Build a bridge to Avalora's operational value.",
      "instruction": "Personalization should create relevance, not decoration. The copywriter should not mention a detail just to prove research. He must use the detail to build a bridge to Avalora's operational value.\n\n- Level 1: Visible (Clinic name, location, service category.) -> A simple reason this clinic is relevant.\n- Level 2: Service-specific (They are promoting Botox, filler, laser, etc.) -> Patient inquiry around that service can come through calls, DMs, forms, or after hours.\n- Level 3: Growth-specific (Active offers, ads, Reels) -> If the clinic is creating demand, response speed helps protect the demand after it arrives.\n- Level 4: Workflow-specific (Booking friction, phone-first flow) -> Avalora helps catch and structure the inquiry before it disappears or becomes messy.\n- Level 5: Status-specific (Luxury/boutique/clinical cues) -> Premium clinics need premium responsiveness and patient trust before the appointment.\n\nPersonalization translation rules:\n- If research shows they promote injectables heavily -> Write the angle as: High-intent injectable inquiries need fast response before patients call another clinic. (Do not write: You are missing Botox leads.)\n- If they have a Book Now button -> Booking intent is already visible; Avalora helps catch the moments around calls, forms, and DMs before handoff.\n- If they appear to run ads/offers -> If ads are creating demand, response speed becomes part of campaign performance.\n- If they use Spanish or bilingual content -> Bilingual intake can support Miami patient communication when it fits the clinic workflow.\n- If they have many patient comments/DMs -> Some booking requests can hide in DMs, comments, or follow-up messages.\n- If they look premium/luxury -> Avalora protects patient experience and keeps the front desk sounding organized.",
      "branchButtons": [
        {
          "id": "cta_ladder",
          "label": "8. CTA ladder",
          "target": "cta_ladder"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "subject_line"
        }
      ]
    },
    "cta_ladder": {
      "id": "cta_ladder",
      "stage": "8. CTA ladder: from reply to 15-minute demo call",
      "goal": "Match CTA to warmth and readiness.",
      "instruction": "The final outcome is a 15-minute demo/private fit call. But the email should not always ask for that immediately. The CTA must match the owner's warmth and psychological readiness.\n\n- Cold -> Reply or permission CTA: Ask if the topic is worth sending/hearing, not if they want a sales call.\n- Cold but strong trigger -> Short demo CTA: Offer the demo as proof, especially if the trigger is missed calls, after-hours, ads, or DMs.\n- After call/voicemail -> Demo or quick reply CTA: Reference the attempted call and keep the next step low-pressure.\n- Gatekeeper -> Forwarding CTA: Ask to forward to whoever handles patient communication, front desk, or operations.\n- Owner requested info -> Demo + 10-15 minute call CTA: Send concise context, demo/website if appropriate, and ask whether 10-15 minutes makes sense.\n- Owner shows pain/interest -> 15-minute demo/private fit call: Move quickly. Do not keep sending educational emails.\n- Demo sent/no reply -> Yes/no relevance CTA: Ask if it is relevant enough to map around their front-desk flow.\n\nCTA principle: One email, one ask. The copywriter must never include: reply here, watch this video, check the site, book a call, and forward to your team all in the same cold email.",
      "branchButtons": [
        {
          "id": "email_families",
          "label": "9. Email families",
          "target": "email_families"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "personalization"
        }
      ]
    },
    "email_families": {
      "id": "email_families",
      "stage": "9. Email families the copywriter must build later",
      "goal": "Use these to create specific variants.",
      "instruction": "This manual is not the final template set. The copywriter should use it to create the email families below once the research inputs and sending scenarios are confirmed.\n\n- Cold first-touch -> Reply-safe interest or short demo permission.\n- After no-answer call -> Worth sending/hearing the short demo?\n- After voicemail -> If relevant, I can send the demo.\n- Gatekeeper-forward -> Could you forward to whoever handles operations/patient communication?\n- Owner requested-info -> Demo + website + 10-15 minute fit call.\n- After Instagram engagement -> Short demo or reply, depending on warmth.\n- Demo delivery -> Worth 10-15 minutes to map around your flow?\n- Follow-up 1 -> Soft yes/no or demo CTA.\n- Follow-up 2 -> Low-friction reply.\n- Follow-up 3 / close loop -> Is this not relevant right now?\n- Objection replies -> Answer briefly, return to demo/call only when appropriate.\n- Post-call recap -> Confirm next action.",
      "branchButtons": [
        {
          "id": "follow_up",
          "label": "10. Follow-up philosophy",
          "target": "follow_up"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "cta_ladder"
        }
      ]
    },
    "follow_up": {
      "id": "follow_up",
      "stage": "10. Follow-up philosophy & 11. Objection handling",
      "goal": "Useful, not pushy.",
      "instruction": "Follow-ups should not be the same email repeated with \"checking in.\" Each follow-up should provide a new reason to care, while staying short.\n\n- Missed-call recovery -> Reminds them of high-intent calls that hit voicemail or peak-time overflow.\n- After-hours capture -> Shows why patient intent can arrive when staff is closed.\n- Speed-to-lead / ads -> Connects paid demand to fast response after the lead arrives.\n- Front-desk relief -> Reassures that Avalora supports the team.\n- Patient trust -> Frames faster response as part of patient experience.\n- Bilingual intake -> Positions bilingual communication as workflow fit, not assumption.\n- Final close-loop -> Leaves reputation intact and offers a clean no.\n\nFollow-up rules: Do not write a 12-email spam sequence. Do not email every day. Do not use guilt, fear, or shame. Do not escalate to calendar link before interest exists.\n\nObjection handling:\n- Send me info -> Ask if 10-15 minutes makes sense after they hear it.\n- We already have receptionists -> Offer demo so they can judge workflow fit.\n- We already have a CRM/booking system -> Offer to map around current booking flow.\n- Is this AI? -> Demo-first because sound and safety matter.\n- How much? -> Suggest 10-15 minute fit call.\n- No time -> Ask if they prefer demo first.",
      "branchButtons": [
        {
          "id": "language_rules",
          "label": "12. Language rules",
          "target": "language_rules"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "email_families"
        }
      ]
    },
    "language_rules": {
      "id": "language_rules",
      "stage": "12. Avalora language rules",
      "goal": "Protect the premium brand tone.",
      "instruction": "Use often:\nlead recovery, booking support, missed-call recovery, after-hours inquiry capture, speed-to-lead, front-desk relief, front-desk overflow, patient communication safety net, clean handoff to staff, clinic-approved FAQs, bilingual intake, support your receptionist, not replace her, recover missed booking moments, protect the patient opportunities your clinic is already creating.\n\nAvoid completely:\nAI receptionist replacement, replace your receptionist, fire your front desk, fully autonomous receptionist, AI will handle everything, guaranteed bookings, guaranteed ROI, cheap call center, chatbot, AI bot, CRM replacement, we automate your whole clinic, medical advice automation, HIPAA-proof unless legally verified, you are losing money, your receptionist is failing.\n\nMaster explanations the copywriter can adapt:\n- One-sentence explanation: Avalora helps Miami med spas recover missed calls, slow callbacks, after-hours inquiries, DMs, and booking requests before patients go cold or call another clinic.\n- Premium owner-level frame: Most med spas already work hard to create demand through Instagram, Google, referrals, and ads. Avalora protects the moments after the patient raises their hand - the missed call, buried DM, form lead, or after-hours inquiry - and hands clean booking intent back to the team.",
      "branchButtons": [
        {
          "id": "qa",
          "label": "13-17. QA & Standards",
          "target": "qa"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "follow_up"
        }
      ]
    },
    "qa": {
      "id": "qa",
      "stage": "13-17. QA, Deliverability & Standard",
      "goal": "Ensure the email is safe and ready.",
      "instruction": "Deliverability constraints:\nTruthful subject/header. Opt-out respect. Physical address/ad rules. Minimal links. Write for relevance and respect to avoid spam complaints. No copy can save a poorly configured sending domain.\n\nFinal approval checklist:\n- Does the email feel written for this clinic, not a list?\n- Is the subject line truthful, plain, and relevant?\n- Can a busy owner understand the reason in 10 seconds?\n- Does the first line use a real observation or prior-touch context?\n- Does the email avoid AI-first language?\n- Does it respect the receptionist and front desk?\n- Does it avoid claiming exact lost revenue or backend knowledge?\n- Is there only one CTA?\n- Is the CTA emotionally congruent with warmth stage?\n- Does the email move toward demo or a 10-15 minute call?\n- Are links minimal and clearly explained?\n- Would this email make Avalora feel premium, calm, and serious?\n\nCopywriter operating standard:\nThe owner should feel: \"They understand how my clinic actually operates, and this protects revenue and patient experience without replacing my team.\" If the email does not create that feeling, it is not ready.",
      "branchButtons": [
        {
          "id": "disposition",
          "label": "End / Disposition",
          "target": "disposition"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "language_rules"
        }
      ]
    },
    "disposition": {
      "id": "disposition",
      "stage": "Execution Next Steps",
      "goal": "Move to execution.",
      "instruction": "Review complete. You may now draft the email based on the clinic research card and this manual.",
      "branchButtons": []
    }
  }
},
  ig_mode: {
  "id": "ig_mode",
  "name": "Instagram DM Copywriter Manual",
  "workspace": "medspa",
  "initialNode": "core_goal",
  "nodes": {
    "core_goal": {
      "id": "core_goal",
      "stage": "1. Core End Goal",
      "goal": "Move belief one step closer to the demo.",
      "instruction": "The end goal is not a clever first DM. The end goal is that the right Miami med spa owner becomes interested enough to book a 15-minute Avalora demo / private fit call through Instagram.\n\nEvery message must move belief one step closer to: \"They understand my clinic, they protect patient experience, and a short call is a reasonable next step.\"\n\nDocument Rules:\n- Not a script bank: This teaches how to create DMs.\n- Research-led: Final DMs must be written only after the outreach team provides the clinic research card.\n- Relationship first: The first message should usually earn interest or a small reply before pushing a demo asset or call.\n- Demo as proof bridge: The short demo is used after curiosity or permission, then the 15-minute call is offered.\n- Premium restraint: Messages should feel calm, specific, and operator-aware, not like mass AI automation.",
      "branchButtons": [
        {
          "id": "mandate",
          "label": "2. The copywriter mandate",
          "target": "mandate"
        }
      ]
    },
    "mandate": {
      "id": "mandate",
      "stage": "2. The Copywriter Mandate",
      "goal": "Convert research into a safe, specific conversation.",
      "instruction": "Your job is not to write persuasive DMs in isolation. Your job is to convert a researched clinic profile into a short, specific Instagram conversation that makes the owner feel safe enough to respond, hear the demo, and then book a 15-minute call if the fit is real.\n\nThe one-line mandate: Write every DM so the owner thinks: \"They noticed something real about my clinic, they understand med spa operations, they are not threatening my front desk, and this may be worth a short conversation.\"\n\nYou are responsible for:\n- Creating message families that can flex around actual clinic research.\n- Writing concise first DMs, story replies, follow-ups, and reply-handling lines.\n- Moving the owner through interest -> demo permission -> 15-minute call.\n- Protecting Avalora premium tone and patient-trust positioning.\n- Reducing resistance with clarity, specificity, and autonomy.\n\nYou are NOT responsible for:\n- Inventing personalization without a research card.\n- Writing long pitch essays inside Instagram DMs.\n- Trying to close a sale directly inside the first conversation.\n- Sounding like a SaaS tool, chatbot, call center, or AI automation agency.\n- Using fake urgency, guilt, fear, or manipulative pressure.",
      "branchButtons": [
        {
          "id": "conversion_path",
          "label": "3. The conversion path",
          "target": "conversion_path"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "core_goal"
        }
      ]
    },
    "conversion_path": {
      "id": "conversion_path",
      "stage": "3. The conversion path",
      "goal": "Map from Instagram touch to 15-minute call.",
      "instruction": "Stage -> Owner belief -> Copy job -> Natural next action\n\n- 0. Pre-contact -> This is just another vendor. -> Make Avalora profile feel credible. -> Owner recognizes account as serious.\n- 1. First DM / story reply -> They noticed something real about us. -> Open a small, specific, non-pushy conversation. -> Owner replies or shows light interest.\n- 2. Interest gate -> This may be relevant to our communication. -> Clarify the operational issue without over-explaining. -> Owner allows demo or asks for info.\n- 3. Demo bridge -> I can judge the experience for myself. -> Send short demo/site only with context and permission. -> Owner hears enough to understand Avalora.\n- 4. Call close -> A 15-minute call is reasonable. -> Make the call feel practical: review workflow, missed moments. -> Owner books the call.\n\nCTA ladder:\n- First CTA: small reply / interest gate.\n- Second CTA: short demo asset if they show curiosity or permission.\n- Third CTA: 15-minute demo / private fit call after the demo.\nNever jump straight to a calendar link unless the owner asks.",
      "branchButtons": [
        {
          "id": "psychology",
          "label": "4. Buyer psychology",
          "target": "psychology"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "mandate"
        }
      ]
    },
    "psychology": {
      "id": "psychology",
      "stage": "4. Buyer psychology & 5. Positioning",
      "goal": "Respect the owner and protect the premium frame.",
      "instruction": "The target buyer is a Miami med spa owner protecting brand reputation, patient trust, team morale, and booking flow.\n\n- Trust risk: Robotic AI, replacement language, compliance ambiguity, overpromising.\n- Proof need: Short demo, clear mechanism, clinic-approved boundaries, bilingual capability, clean handoff.\n\nAvalora positioning the copywriter must preserve:\nCorrect frame: Lead recovery and booking support infrastructure. A safety net around the front desk. Clean handoff system for missed moments.\nWrong frame: Generic AI receptionist. A replacement for the receptionist. A chatbot or cheap automation tool. Blames the staff for missing calls.\n\nCore phrases to build around:\n- Avalora protects the patient opportunities your clinic is already creating.\n- Missed calls, after-hours inquiries, DMs, forms, and booking requests before patients go cold.\n- Front desk support, not front desk replacement.\n- Patient experience starts before the appointment.\n\nPhrases to avoid:\n- AI receptionist, automate your front desk, replace your receptionist, your receptionist is missing calls, your clinic is losing money.",
      "branchButtons": [
        {
          "id": "input_required",
          "label": "6. Required input",
          "target": "input_required"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "conversion_path"
        }
      ]
    },
    "input_required": {
      "id": "input_required",
      "stage": "6. Required input & 7. Message architecture",
      "goal": "Write from the research card using the fixed chassis.",
      "instruction": "The copywriter should not write final DMs until the outreach team provides a research card. Final copy without clinic data becomes generic.\n\nResearch card format includes:\nClinic, Person, Visible detail, Treatment/demand signal, Booking path, Language signal, Brand tone, Best conversation door.\n\nMessage architecture: fixed chassis, flexible personalization\n- 1. Visible observation: Proves we looked at the clinic.\n- 2. Relevance bridge: Connects that detail to calls, DMs, forms, after-hours, booking, or follow-up. (Use \"may be relevant\" language).\n- 3. Avalora frame: Names what Avalora does in plain med-spa language.\n- 4. Interest gate: Invites a small reply before a heavy ask.\n- 5. Demo bridge: Offers short demo only after interest or permission.\n- 6. Call close: Moves from proof to a 15-minute live call.\n\nThe first CTA does not have to be \"Want the demo?\" by default. For many owners, the first CTA should be a relationship or interest gate: a tiny question, a permission check, or a soft relevance test.",
      "branchButtons": [
        {
          "id": "dm_families",
          "label": "8. DM families",
          "target": "dm_families"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "psychology"
        }
      ]
    },
    "dm_families": {
      "id": "dm_families",
      "stage": "8. DM families to create",
      "goal": "Adapt to the specific clinic research.",
      "instruction": "Once the research card arrives, write 3 variants (Softest, Balanced, Direct) under the right family:\n\n- Recent treatment post: Treatment interest creates booking questions. The issue is capturing intent while it is fresh.\n- Booking flow / Book Now: Booking intent can still stall before it becomes a confirmed appointment.\n- Instagram DM / comment leakage: A DM can be a booking request hiding in plain sight.\n- Ad / growth-heavy clinic: Ads may create demand; response speed captures it.\n- Bilingual Miami: Bilingual responsiveness can be part of patient experience.\n- Founder / nurse-injector owner: Founder standard and patient experience are extensions of the owner reputation.\n- Premium/luxury clinic: Premium clinics need premium responsiveness before the appointment.\n- After-hours / weekend inquiry: Patients research when the clinic is closed; capture without forcing staff to be always on.\n- Call-first support: IG becomes a warmer, lighter route to the same operational issue.",
      "branchButtons": [
        {
          "id": "personalization_levels",
          "label": "9. Personalization levels",
          "target": "personalization_levels"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "input_required"
        }
      ]
    },
    "personalization_levels": {
      "id": "personalization_levels",
      "stage": "9. Personalization depth & 10. CTA rules",
      "goal": "Create deep relevance and the right ask.",
      "instruction": "A strong Avalora DM should rarely stop at Level 1.\n- Level 1: Visible (A real surface detail) -> Proves we looked.\n- Level 2: Operational (What that detail implies about inquiry flow) -> Creates relevance without accusation.\n- Level 3: Status / standard (What the owner wants the patient experience to signal) -> Makes Avalora feel aligned with their standard.\n\nCTA and link rules:\n- No prior relationship: Small reply / interest gate / light question.\n- Owner asks \"what is this?\": One-line Avalora explanation, then ask if demo would be useful.\n- Owner says \"send info\": Send demo/site with one-sentence context.\n- Owner shows operational pain: Offer short demo or 15-minute call depending on energy.\n- Owner asks pricing: Give starting price if needed, then move to demo/call.\nDo not send link or calendar by default. Do not keep chatting endlessly in DM.",
      "branchButtons": [
        {
          "id": "follow_up",
          "label": "11. Follow-up & 12. Reply handling",
          "target": "follow_up"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "dm_families"
        }
      ]
    },
    "follow_up": {
      "id": "follow_up",
      "stage": "11. Follow-up strategy & 12. Reply map",
      "goal": "Refresh relevance without guilt.",
      "instruction": "Follow-ups should not sound like reminders. They should add relevance, make the next step easier, or cleanly close the loop.\n- Follow-up 1 (2-3 days): Add one short angle tied to their research card. Keep under 2 lines.\n- Follow-up 2 (4-6 days): Clarify value and invite a yes/no response.\n- Final soft close (7-10 days): Respectfully close. Mention the specific relevance once. Do not chase.\n\nReply-handling map:\n- What is this? -> Plain Avalora one-liner; do not lead with AI. -> Ask if short demo would be useful.\n- Send info. -> Send demo/site with one-sentence context. -> Offer 10-15 minute walkthrough if relevant.\n- We already have a receptionist. -> Agree first. Clarify support for overflow, after-hours. -> Offer demo to judge fit, not replacement.\n- Is this AI? -> Be transparent but reframe around patient communication support, approved rules, human handoff. -> Demo first so they can judge quality.\n- Will it sound robotic? -> Validate concern. Say demo exists for exactly that reason. -> Send demo or offer short call.\n- How much? -> Share starting price only if needed. -> Suggest demo/call before pricing detail.",
      "branchButtons": [
        {
          "id": "qa",
          "label": "13-18. Tone, QA, & Standard",
          "target": "qa"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "personalization_levels"
        }
      ]
    },
    "qa": {
      "id": "qa",
      "stage": "13-18. Tone, QA, & Standard",
      "goal": "Ensure the DM is safe, professional, and ready.",
      "instruction": "Tone system: Calm, warm, controlled, concise. Quiet competence, premium standard, patient-experience protection. Support the front desk, protect trust, organize demand.\n\nWriting constraints:\n- First DM: usually 2-4 short lines maximum.\n- Follow-up: usually 1-2 short lines maximum.\n- Objection reply: one idea per message.\n- No feature lists in first DM.\n- No link in first cold DM.\n\nQA checklist before any DM goes live:\n- Does the message reference a real, visible clinic detail?\n- Is the personalization respectful and not creepy?\n- Does the message avoid claiming we know their backend, missed calls, or revenue leakage?\n- Does the message avoid AI-first wording?\n- Does the message protect the receptionist/front desk relationship?\n- Is the message short enough for Instagram?\n- Can the owner easily say yes, no, or \"send it\" without feeling trapped?\n- Would this message still feel professional if screenshotted and shared?",
      "branchButtons": [
        {
          "id": "disposition",
          "label": "End / Disposition",
          "target": "disposition"
        },
        {
          "id": "back",
          "label": "Back",
          "target": "follow_up"
        }
      ]
    },
    "disposition": {
      "id": "disposition",
      "stage": "Execution Next Steps",
      "goal": "Move to execution.",
      "instruction": "Review complete. You may now draft the IG DM based on the clinic research card and this manual.",
      "branchButtons": []
    }
  }
}
};
