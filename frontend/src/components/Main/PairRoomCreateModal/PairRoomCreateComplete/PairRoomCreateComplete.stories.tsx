import { BrowserRouter } from 'react-router-dom';

import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { Modal } from '@/components/common/Modal';

import { PAIR_ROOM_MODAL_INFO } from '@/constants/pairRoomModalInfo';

import { theme } from '@/styles/theme';

import PairRoomCreateComplete from './PairRoomCreateComplete';

const meta = {
  title: 'component/PairRoomCreateModal/PairRoomCreateComplete',
  component: PairRoomCreateComplete,
} satisfies Meta<typeof PairRoomCreateComplete>;

export default meta;

type Story = StoryObj<typeof PairRoomCreateComplete>;

const queryClient = new QueryClient();

export const Default: Story = {
  render: () => {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Modal isOpen={true} close={() => console.log()} size="60rem" height="45rem">
              <Modal.Header
                title={PAIR_ROOM_MODAL_INFO.complete.title}
                subTitle={PAIR_ROOM_MODAL_INFO.complete.subtitle}
              />
              <Modal.CloseButton close={() => console.log()} />
              <PairRoomCreateComplete closeModal={() => console.log()} accessCode="12345" />
            </Modal>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  },
};
