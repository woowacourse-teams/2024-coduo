import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles/theme';

import PairRoomCreateModal from './PairRoomCreateModal';

const meta = {
  title: 'component/PairRoomCreateModal/PairRoomCreateModal',
  component: PairRoomCreateModal,
} satisfies Meta<typeof PairRoomCreateModal>;

export default meta;

type Story = StoryObj<typeof PairRoomCreateModal>;

const queryClient = new QueryClient();

export const Default: Story = {
  render: () => {
    return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <PairRoomCreateModal isOpen={true} closeModal={() => console.log()} />
        </QueryClientProvider>
      </ThemeProvider>
    );
  },
  args: {
    isOpen: true,
  },
};
