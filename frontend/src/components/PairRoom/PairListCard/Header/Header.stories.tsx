import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta = {
  title: 'component/PairRoom/PairListCard/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
