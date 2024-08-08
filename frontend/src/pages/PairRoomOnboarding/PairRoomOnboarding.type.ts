export type Step = 'MISSION' | 'ROLE';

export interface StepOption {
  id: Step;
  label: string;
}

export type Role = 'DRIVER' | 'NAVIGATOR';
