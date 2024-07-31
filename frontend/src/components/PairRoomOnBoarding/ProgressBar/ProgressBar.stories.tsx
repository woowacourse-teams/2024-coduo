import type { Meta, StoryObj } from '@storybook/react';

import { Step } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

import ProgressBar from './ProgressBar';

const meta = {
  title: 'component/PairRoomOnboarding/ProgressBar',
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Role: Story = {
  args: {
    step: 'role' as Step,
    isRoleSelected: false,
  },
};

export const Timer: Story = {
  args: {
    step: 'timer' as Step,
    isRoleSelected: true,
  },
};
