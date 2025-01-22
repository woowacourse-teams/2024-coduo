import type { Meta, StoryObj } from '@storybook/react';

import TimerCard from './TimerCard';

const meta = {
  title: 'component/PairRoom/TimerCard',
  component: TimerCard,
} satisfies Meta<typeof TimerCard>;

export default meta;

type Story = StoryObj<typeof TimerCard>;

export const Default: Story = {
  args: {},
};
