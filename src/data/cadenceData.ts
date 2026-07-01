export interface CadenceStep {
  touch: number;
  day: string;
  channel: string;
  action: string;
  link: 'ig' | 'call' | 'email' | 'both';
  bgColor: string;
  borderColor: string;
}

export const cadenceSteps: CadenceStep[] = [
  {
    touch: 1,
    day: 'Day 1',
    channel: 'Instagram',
    action: 'Instagram soft touch - Create light familiarity',
    link: 'ig',
    bgColor: '#FFF5F0',
    borderColor: 'var(--color-accent-amber)',
  },
  {
    touch: 2,
    day: 'Day 1',
    channel: 'Call',
    action: 'Call - Try live access / find route to owner',
    link: 'call',
    bgColor: '#F5F9F6',
    borderColor: 'var(--color-accent-sage)',
  },
  {
    touch: 3,
    day: 'Day 2',
    channel: 'Instagram',
    action: 'Instagram DM - Main direct-owner message',
    link: 'ig',
    bgColor: '#FFF5F0',
    borderColor: 'var(--color-accent-amber)',
  },
  {
    touch: 4,
    day: 'Day 4',
    channel: 'Email',
    action: 'Email - Backup/proof/forwardable message',
    link: 'email',
    bgColor: '#FAFAFA',
    borderColor: 'var(--color-deep-charcoal)',
  },
  {
    touch: 5,
    day: 'Day 6',
    channel: 'Call',
    action: 'Call - Second live attempt with context',
    link: 'call',
    bgColor: '#F5F9F6',
    borderColor: 'var(--color-accent-sage)',
  },
  {
    touch: 6,
    day: 'Day 9',
    channel: 'Instagram',
    action: 'Instagram DM follow-up - Push the core pain again',
    link: 'ig',
    bgColor: '#FFF5F0',
    borderColor: 'var(--color-accent-amber)',
  },
  {
    touch: 7,
    day: 'Day 14',
    channel: 'Email & DM',
    action: 'Email follow-up and DM - Professional follow-up / value angle',
    link: 'both',
    bgColor: '#FAFAFA',
    borderColor: 'var(--color-deep-charcoal)',
  },
  {
    touch: 8,
    day: 'Day 18-21',
    channel: 'Call or DM',
    action: 'Final call or DM - Close loop',
    link: 'call',
    bgColor: '#F5F9F6',
    borderColor: 'var(--color-accent-sage)',
  },
];
