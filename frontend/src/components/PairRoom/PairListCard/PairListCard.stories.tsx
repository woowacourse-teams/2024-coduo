import type { Meta, StoryObj } from '@storybook/react';

import PairListCard from './PairListCard';

const meta = {
  title: 'component/PairRoom/PairListCard',
  component: PairListCard,
} satisfies Meta<typeof PairListCard>;

export default meta;

type Story = StoryObj<typeof PairListCard>;

export const Default: Story = {
  args: {
    roomCode: 'IUUIASDFJK',
    driver: '퍼렁',
    navigator: '포롱',
  },
};
