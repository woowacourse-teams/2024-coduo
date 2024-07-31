import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from '@/components/common/Modal';

import { PAIR_ROOM_MODAL_INFO } from '@/constants/pairRoomModalInfo';

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
        <Modal.Header title={PAIR_ROOM_MODAL_INFO.complete.title} subTitle={PAIR_ROOM_MODAL_INFO.complete.subtitle} />
        <Modal.CloseButton close={() => console.log()} />
        <PairRoomCreateComplete closeModal={() => console.log()} accessCode="12345" />
      </Modal>
    );
  },
};
