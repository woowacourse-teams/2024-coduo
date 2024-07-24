import type { Meta, StoryObj } from '@storybook/react';

import MemoCard from './MemoCard';

const meta = {
  title: 'component/PairRoom/MemoCard',
  component: MemoCard,
} satisfies Meta<typeof MemoCard>;

export default meta;

type Story = StoryObj<typeof MemoCard>;

export const Default: Story = {
  args: {},
};
