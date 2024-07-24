import type { Meta, StoryObj } from '@storybook/react';

import PairRoleCard from './PairRoleCard';

const meta = {
  title: 'component/PairRoom/PairRoleCard',
  component: PairRoleCard,
} satisfies Meta<typeof PairRoleCard>;

export default meta;

type Story = StoryObj<typeof PairRoleCard>;

export const Default: Story = {
  args: {},
};
