import React from 'react';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../src/styles/theme';
import GlobalStyle from '../src/styles/Global.style';
import '../src/styles/font.css';

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    viewport: {
      viewport: { defaultViewport: 'iphonese2' },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Story />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;
