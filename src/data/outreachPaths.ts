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
    id: 'email_mode',
    name: 'Email Mode Execution',
    workspace: 'medspa',
    initialNode: 'research',
    nodes: {
      research: {
        id: 'research',
        stage: 'Step 1: Account Qualification & Research',
        goal: 'Gather intelligence to form the safest angle.',
        checklist: [
          'Website Intelligence (check services, booking flow)',
          'Instagram Intelligence (check recent activity, demand signals)',
          'Identify Decision-Maker'
        ],
        fields: [
          { label: 'Clinic Name', placeholder: 'Clinic name' },
          { label: 'Owner/Operator', placeholder: 'Owner name' },
          { label: 'Website Observation', placeholder: 'e.g., strong booking CTA' },
          { label: 'Instagram Observation', placeholder: 'e.g., active on stories' },
          { label: 'Bilingual Signal', placeholder: 'Yes/No' }
        ],
        instruction: 'Complete the Research Card before selecting an angle. DO NOT use forbidden assumptions.',
        branchButtons: [{ id: 'next', label: 'Next: Angle Selection', target: 'angle' }]
      },
      angle: {
        id: 'angle',
        stage: 'Step 2: Angle Selection',
        goal: 'Match the research to the correct email scenario.',
        instruction: 'Select the best angle based on the Research Card:',
        branchButtons: [
          { id: 'after_vm', label: 'After Voicemail Email', target: 'cta_stage' },
          { id: 'after_gk', label: 'After Gatekeeper Email', target: 'cta_stage' },
          { id: 'cold_ig', label: 'Cold Email after IG Research', target: 'cta_stage' },
          { id: 'send_demo', label: 'Send Demo Email', target: 'cta_stage' },
          { id: 'close_loop', label: 'Close Loop Email', target: 'cta_stage' }
        ]
      },
      cta_stage: {
        id: 'cta_stage',
        stage: 'Step 3: CTA & Subject Line',
        goal: 'Select the correct Subject Line and CTA ladder step.',
        instruction: '[Content Slot: Subject Line Guidance & Email Chassis]. Make sure the CTA matches the temperature of the outreach.',
        branchButtons: [{ id: 'next', label: 'Next: Final QA Review', target: 'qa' }, { id: 'back', label: 'Back: Angle', target: 'angle' }]
      },
      qa: {
        id: 'qa',
        stage: 'Step 4: Final QA Checklist',
        goal: 'Verify safety and compliance before sending.',
        checklist: [
          'Correct audience selected',
          'Correct angle based on research',
          'No forbidden language used',
          'CTA is appropriate and not over-pitching',
          'No unsupported medical/compliance claims',
          'Next action is clear'
        ],
        branchButtons: [{ id: 'done', label: 'Approve & Send', target: 'done' }, { id: 'back', label: 'Back to Edit', target: 'cta_stage' }]
      }
    }
  },
  ig_mode: {
    id: 'ig_mode',
    name: 'Instagram DM Mode Execution',
    workspace: 'medspa',
    initialNode: 'research',
    nodes: {
      research: {
        id: 'research',
        stage: 'Step 1: IG Prospect Dossier',
        goal: 'Determine Fit Score and Persona.',
        checklist: [
          'Check Who Qualifies / Who Does Not',
          'Assess Fit Score',
          'Map Persona',
          'Identify recent demand signal or specific visible observation'
        ],
        fields: [
          { label: 'IG Handle', placeholder: '@handle' },
          { label: 'Fit Score', placeholder: 'High/Medium/Low' },
          { label: 'Persona', placeholder: 'e.g., Solo Injector vs Med Spa' },
          { label: 'Avalora Relevance Bridge', placeholder: 'How does our solution apply?' },
          { label: 'Trust Risk', placeholder: 'e.g., Overly corporate profile' }
        ],
        instruction: 'Build familiarity first. DO NOT default to "here is the demo".',
        branchButtons: [{ id: 'next', label: 'Next: First-DM Readiness', target: 'gate' }]
      },
      gate: {
        id: 'gate',
        stage: 'Step 2: First-DM Readiness Gate',
        goal: 'Ensure engagement before DM.',
        instruction: 'Have you completed the Engagement-Before-DM Rules (e.g., liking, thoughtful comment)?',
        branchButtons: [{ id: 'yes', label: 'Yes, proceed to DM', target: 'chassis' }, { id: 'back', label: 'No, go back', target: 'research' }]
      },
      chassis: {
        id: 'chassis',
        stage: 'Step 3: DM Chassis & Families',
        goal: 'Start a small conversation.',
        instruction: '[Content Slot: DM Families]. Pick a micro-reply or opening that builds trust.',
        branchButtons: [{ id: 'demo_bridge', label: 'Demo Bridge', target: 'demo_bridge' }, { id: 'back', label: 'Back', target: 'gate' }]
      },
      demo_bridge: {
        id: 'demo_bridge',
        stage: 'Step 4: Demo Bridge & Fit Call',
        goal: 'Transition from conversation to demo permission.',
        instruction: 'Only use the Demo Bridge when the prospect has responded positively.',
        branchButtons: [{ id: 'qa', label: 'Next: Final QA Review', target: 'qa' }, { id: 'back', label: 'Back', target: 'chassis' }]
      },
      qa: {
        id: 'qa',
        stage: 'Step 5: Final QA Checklist',
        goal: 'Verify safety and compliance before sending.',
        checklist: [
          'Correct audience selected',
          'Familiarity established before pitching',
          'No forbidden language used',
          'CTA is appropriate (not pushing 15-min call immediately)',
          'No unsupported medical/compliance claims'
        ],
        branchButtons: [{ id: 'done', label: 'Approve & Send', target: 'done' }, { id: 'back', label: 'Back to Edit', target: 'demo_bridge' }]
      }
    }
  }
};
