import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

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
          <CompleteCreatePairRoomModal isOpen={true} closeModal={() => console.log()} pairRoomCode="abcdef" />
        </QueryClientProvider>
      </ThemeProvider>
    );
  },
  args: {
    isOpen: true,
  },
};
