import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from '@/components/common/Modal';

import PairRoomCreateComplete from './PairRoomCreateComplete';

const meta = {
  title: 'component/PairRoomCreateModal/PairRoomCreateComplete',
  component: PairRoomCreateComplete,
} satisfies Meta<typeof PairRoomCreateComplete>;

export default meta;

type Story = StoryObj<typeof PairRoomCreateComplete>;

export const Default: Story = {
  render: () => {
    return (
      <Modal isOpen={true} close={() => console.log()} size="60rem" height="45rem">
        <Modal.CloseButton close={() => console.log()} />
        <PairRoomCreateComplete closeModal={() => console.log()} accessCode="12345" />
      </Modal>
    );
  },
};
