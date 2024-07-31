import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import CreatePairRoomModal from '@/components/Main/CreatePairRoomModal/CreatePairRoomModal';

import { theme } from '@/styles/theme';

const meta = {
  title: 'component/CreatePairRoom/CreatePairRoom',
  component: CreatePairRoomModal,
} satisfies Meta<typeof CreatePairRoomModal>;

export default meta;

type Story = StoryObj<typeof CreatePairRoomModal>;

const queryClient = new QueryClient();

export const Default: Story = {
  render: () => {
    return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CreatePairRoomModal isOpen={true} closeModal={() => console.log()} />
        </QueryClientProvider>
      </ThemeProvider>
    );
  },
  args: {
    isOpen: true,
  },
};
