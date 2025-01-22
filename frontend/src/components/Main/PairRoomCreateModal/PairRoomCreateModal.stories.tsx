import type { Meta, StoryObj } from '@storybook/react';

import PairRoomCreateModal from './PairRoomCreateModal';

const meta = {
  title: 'component/PairRoomCreateModal/PairRoomCreateModal',
  component: PairRoomCreateModal,
} satisfies Meta<typeof PairRoomCreateModal>;

export default meta;

type Story = StoryObj<typeof PairRoomCreateModal>;

export const Default: Story = {
  render: () => {
    return <PairRoomCreateModal isOpen={true} closeModal={() => console.log()} />;
  },
  args: {
    isOpen: true,
  },
};
