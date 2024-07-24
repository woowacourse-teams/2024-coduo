import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { Modal } from '@/components/common/Modal';
import { PAIR_ROOM_MODAL_INFO } from '@/components/constants/pairRoomModalInfo';
import CompleteCreatePairRoomModal from '@/components/CreatePairRoom/CompleteCreatePairRoomModal';

import { theme } from '@/styles/theme';

const meta = {
  title: 'component/CreatePairRoom/CompleteCreatePairRoomModal',
  component: CompleteCreatePairRoomModal,
} satisfies Meta<typeof CompleteCreatePairRoomModal>;

export default meta;

type Story = StoryObj<typeof CompleteCreatePairRoomModal>;

const queryClient = new QueryClient();

export const Default: Story = {
  render: () => {
    return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Modal isOpen={true} close={() => console.log()} size="60rem" height="45rem">
            <Modal.Header
              title={PAIR_ROOM_MODAL_INFO.complete.title}
              subTitle={PAIR_ROOM_MODAL_INFO.complete.subtitle}
            />
            <Modal.CloseButton close={() => console.log()} />
            <CompleteCreatePairRoomModal closeModal={() => console.log()} pairRoomCode="abcdef" />
          </Modal>
        </QueryClientProvider>
      </ThemeProvider>
    );
  },
};
