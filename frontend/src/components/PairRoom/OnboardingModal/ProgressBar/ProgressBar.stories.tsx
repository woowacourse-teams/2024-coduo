import type { Meta, StoryObj } from '@storybook/react';

import { Step } from '@/components/PairRoom/OnboardingModal/OnboardingModal.type';

import Progress from './ProgressBar';

const meta = {
  title: 'component/PairRoom/OnboardingModal/Progress',
  component: Progress,
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof Progress>;

export const RoleSelectStep: Story = {
  args: {
    step: 'roleSelect' as Step,
    isRoleSelected: false,
  },
};

export const TimerSettingStep: Story = {
  args: {
    step: 'timerSetting' as Step,
    isRoleSelected: true,
  },
};
