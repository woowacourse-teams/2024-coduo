import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { Modal } from '@/components/common/Modal';
import CompleteCreatePairRoom from '@/components/CreatePairRoomModal/CompleteCreatePairRoom';

import { PAIR_ROOM_MODAL_INFO } from '@/constants/pairRoomModalInfo';

import { theme } from '@/styles/theme';

const meta = {
  title: 'component/CreatePairRoom/CompleteCreatePairRoomModal',
  component: CompleteCreatePairRoom,
} satisfies Meta<typeof CompleteCreatePairRoom>;

export default meta;

type Story = StoryObj<typeof CompleteCreatePairRoom>;

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
            <CompleteCreatePairRoom closeModal={() => console.log()} accessCode="abcdef" />
          </Modal>
        </QueryClientProvider>
      </ThemeProvider>
    );
  },
};
