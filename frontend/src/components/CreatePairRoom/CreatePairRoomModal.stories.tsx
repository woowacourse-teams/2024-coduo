import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import CreatePairRoom from '@/components/CreatePairRoom/CreatePairRoom';

import { theme } from '@/styles/theme';

const meta = {
  title: 'component/CreatePairRoom/CreatePairRoom',
  component: CreatePairRoom,
} satisfies Meta<typeof CreatePairRoom>;

export default meta;

type Story = StoryObj<typeof CreatePairRoom>;

const queryClient = new QueryClient();

export const Default: Story = {
  render: () => {
    return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CreatePairRoom isOpen={true} closeModal={() => console.log()} />
        </QueryClientProvider>
      </ThemeProvider>
    );
  },
  args: {
    isOpen: true,
  },
};
