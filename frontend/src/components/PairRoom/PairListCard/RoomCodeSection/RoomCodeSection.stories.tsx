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
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    roomCode: 'IUUIASDFJK',
  },
};
