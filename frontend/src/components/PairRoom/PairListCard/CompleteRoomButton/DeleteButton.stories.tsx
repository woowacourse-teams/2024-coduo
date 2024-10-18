import type { Meta, StoryObj } from '@storybook/react';

import DeleteButton from './CompleteRoomButton';

const meta = {
  title: 'component/PairRoom/PairListCard/DeleteButton',
  component: DeleteButton,
} satisfies Meta<typeof DeleteButton>;

export default meta;

type Story = StoryObj<typeof DeleteButton>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClick: () => alert('페어룸 종료하기'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClick: () => alert('페어룸 종료하기'),
  },
};
