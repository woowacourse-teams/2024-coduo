import type { Meta, StoryObj } from '@storybook/react';

import PairListSection from './PairListSection';

const meta = {
  title: 'component/PairRoom/PairListCard/PairListSection',
  component: PairListSection,
} satisfies Meta<typeof PairListSection>;

export default meta;

type Story = StoryObj<typeof PairListSection>;

export const Default: Story = {
  args: {
    isOpen: true,
    driver: '퍼렁',
    navigator: '포롱',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    driver: '퍼렁',
    navigator: '포롱',
  },
};
