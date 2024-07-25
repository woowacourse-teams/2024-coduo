import type { Meta, StoryObj } from '@storybook/react';

import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';

const meta = {
  title: 'component/PairRoom/PairRoleCard',
  component: PairRoleCard,
  parameters: {
    controls: { exclude: 'onSwap' },
  },
} satisfies Meta<typeof PairRoleCard>;

export default meta;

type Story = StoryObj<typeof PairRoleCard>;

export const Default: Story = {
  args: {
    driver: '퍼렁',
    navigator: '포롱',
  },
};
