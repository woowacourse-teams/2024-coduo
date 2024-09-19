import { useEffect, Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

const PairRoom = lazy(() => import('@/pages/PairRoom/PairRoom'));
const PairRoomOnboarding = lazy(() => import('@/pages/PairRoomOnboarding/PairRoomOnboarding'));

import Callback from '@/pages/Callback/Callback';
import Docs from '@/pages/CoduoDocs/CoduoDocs';
import PageNotFound from '@/pages/Error/PageNotFound';
import HowToPair from '@/pages/HowToPair/HowToPair';
import Landing from '@/pages/Landing/Landing';
import Layout from '@/pages/Layout';
import Loading from '@/pages/Loading/Loading';
import Main from '@/pages/Main/Main';
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
          path: 'coduo-docs',
          element: <Docs />,
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
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
export default App;
