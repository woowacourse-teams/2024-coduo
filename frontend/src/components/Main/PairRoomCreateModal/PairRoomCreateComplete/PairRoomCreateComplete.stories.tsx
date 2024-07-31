import { BrowserRouter } from 'react-router-dom';

import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { Modal } from '@/components/common/Modal';

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
            <Modal isOpen={true} close={() => {}} size="60rem" height="45rem">
              <Modal.Header title="페어룸 만들기 완료" subTitle="아래의 코드를 통해 계속 방에 참가하실 수 있습니다!" />
              <Modal.CloseButton close={() => {}} />
              <PairRoomCreateComplete closeModal={() => {}} accessCode="12345" />
            </Modal>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  },
};
