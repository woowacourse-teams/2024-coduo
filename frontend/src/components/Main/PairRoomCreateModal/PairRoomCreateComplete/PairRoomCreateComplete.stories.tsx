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
        <Modal.Header title="페어룸 만들기 완료" subTitle="아래의 코드를 통해 계속 방에 참가하실 수 있습니다!" />
        <Modal.CloseButton close={() => console.log()} />
        <PairRoomCreateComplete closeModal={() => console.log()} accessCode="12345" />
      </Modal>
    );
  },
};
