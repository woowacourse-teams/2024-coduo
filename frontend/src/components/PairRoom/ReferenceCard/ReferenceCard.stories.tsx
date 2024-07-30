import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles/theme';

import ReferenceCard from './ReferenceCard';

const meta = {
  title: 'component/PairRoom/ReferenceCard',
  component: ReferenceCard,
} satisfies Meta<typeof ReferenceCard>;

export default meta;

type Story = StoryObj<typeof ReferenceCard>;

const queryClient = new QueryClient();

export const Default: Story = {
  render: () => (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReferenceCard accessCode="" />
      </QueryClientProvider>
    </ThemeProvider>
  ),
};
