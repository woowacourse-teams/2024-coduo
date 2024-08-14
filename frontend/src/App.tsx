import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import Callback from '@/pages/Callback/Callback';
import PageNotFound from '@/pages/Error/PageNotFound';
import HowToPair from '@/pages/HowToPair/HowToPair';
import Layout from '@/pages/Layout';
import Main from '@/pages/Main/Main';
import PairRoom from '@/pages/PairRoom/PairRoom';
import PairRoomOnboarding from '@/pages/PairRoomOnboarding/PairRoomOnboarding';
import SignUp from '@/pages/SignUp/SignUp';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: '',
          element: <Main />,
        },
        {
          path: 'how-to-pair',
          element: <HowToPair />,
        },
        {
          path: 'room/:accessCode',
          element: <PairRoom />,
        },
        {
          path: 'room/:accessCode/onboarding',
          element: <PairRoomOnboarding />,
        },
        {
          path: 'sign-up',
          element: <SignUp />,
        },
        {
          path: 'callback',
          element: <Callback />,
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
