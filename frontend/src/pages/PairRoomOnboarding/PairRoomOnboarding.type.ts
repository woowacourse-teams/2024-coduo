export type Step = 'MISSION' | 'ROLE' | 'TIMER';

export interface StepOption {
  id: Step;
  label: string;
}

export type Role = 'DRIVER' | 'NAVIGATOR';
