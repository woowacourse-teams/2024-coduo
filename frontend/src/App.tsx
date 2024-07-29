import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import Layout from '@/pages/Layout';
import Main from '@/pages/Main/Main';
import PairRoom from '@/pages/PairRoom/PairRoom';
import PairRoomOnboarding from '@/pages/PairRoomOnboarding/PairRoomOnboarding';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Main />,
        },
        {
          path: 'room/:accessCode',
          element: <PairRoom />,
        },
        {
          path: 'room/:accessCode/onboarding',
          element: <PairRoomOnboarding />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
export default App;
