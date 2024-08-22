import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import Callback from '@/pages/Callback/Callback';
import PageNotFound from '@/pages/Error/PageNotFound';
import HowToPair from '@/pages/HowToPair/HowToPair';
import Landing from '@/pages/Landing/Landing';
import Layout from '@/pages/Layout';
import Main from '@/pages/Main/Main';
import PairRoom from '@/pages/PairRoom/PairRoom';
import PairRoomOnboarding from '@/pages/PairRoomOnboarding/PairRoomOnboarding';
import SignUp from '@/pages/SignUp/SignUp';

import useUserStatusStore from '@/stores/userStatusStore';

import { getIsUserLoggedIn } from '@/apis/oauth';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

const App = () => {
  const { setUserStatus } = useUserStatusStore();

  const checkUserStatus = async () => {
    const response = await getIsUserLoggedIn();
    setUserStatus(response.signedIn ? 'SIGNED_IN' : 'SIGNED_OUT');
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      checkUserStatus();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: '',
          element: <Landing />,
        },
        {
          path: 'main',
          element: <Main />,
        },
        {
          path: 'how-to-pair',
          element: <HowToPair />,
        },
        {
          path: 'onboarding',
          element: <PairRoomOnboarding />,
        },
        {
          path: 'room/:accessCode',
          element: <PairRoom />,
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
