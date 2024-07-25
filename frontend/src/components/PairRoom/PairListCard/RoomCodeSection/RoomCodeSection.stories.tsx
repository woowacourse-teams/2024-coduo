import type { Meta, StoryObj } from '@storybook/react';

import RoomCodeSection from './RoomCodeSection';

const meta = {
  title: 'component/PairRoom/PairListCard/RoomCodeSection',
  component: RoomCodeSection,
} satisfies Meta<typeof RoomCodeSection>;

export default meta;

type Story = StoryObj<typeof RoomCodeSection>;

export const Default: Story = {
  args: {
    isOpen: true,
    roomCode: 'IUUIASDFJK',
    onCopy: () => alert('Room code copied'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    roomCode: 'IUUIASDFJK',
    onCopy: () => alert('Room code copied'),
  },
};
