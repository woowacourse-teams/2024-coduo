import type { Meta, StoryObj } from '@storybook/react';

import type { Step } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

import ProgressBar from './ProgressBar';

const meta = {
  title: 'component/PairRoomOnboarding/ProgressBar',
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    step: 'ROLE' as Step,
  },
};
