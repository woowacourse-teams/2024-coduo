import type { Meta, StoryObj } from '@storybook/react';

import DeleteButton from './DeleteButton';

const meta = {
  title: 'component/PairRoom/PairListCard/DeleteButton',
  component: DeleteButton,
} satisfies Meta<typeof DeleteButton>;

export default meta;

type Story = StoryObj<typeof DeleteButton>;

export const Default: Story = {
  args: {
    isOpen: true,
    onRoomDelete: () => alert('Room deleted'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onRoomDelete: () => alert('Room deleted'),
  },
};
