import { useEffect, Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

const PairRoom = lazy(() => import('@/pages/PairRoom/PairRoom'));

import Callback from '@/pages/Callback/Callback';
import CoduoDocs from '@/pages/CoduoDocs/CoduoDocs';
import CompletedPairRoom from '@/pages/CompletedPairRoom/CompletedPairRoom';
import Error from '@/pages/Error/Error';
import Landing from '@/pages/Landing/Landing';
import Layout from '@/pages/Layout';
import Loading from '@/pages/Loading/Loading';
import Main from '@/pages/Main/Main';
import MyPage from '@/pages/MyPage/MyPage';
import PairRoomOnboarding from '@/pages/PairRoomOnboarding/PairRoomOnboarding';
import PrivateRoutes from '@/pages/PrivateRoutes';
import RetrospectForm from '@/pages/RetrospectForm/RetrospectForm';
import RetrospectView from '@/pages/RetrospectView/RetrospectView';
import SignUp from '@/pages/SignUp/SignUp';

import HowToPair from '@/components/Landing/HowToPair/HowToPair';

import useUserStore from '@/stores/userStore';

import { getMember } from '@/apis/member';
import { getIsUserLoggedIn } from '@/apis/oauth';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

const App = () => {
  const { setUser } = useUserStore();

  const updateUser = async () => {
    const { signedIn } = await getIsUserLoggedIn();

    if (!signedIn) {
      setUser('', 'SIGNED_OUT');
      return;
    }

    const { username } = await getMember();

    setUser(username, 'SIGNED_IN');
  };

  useEffect(() => {
    if (window.location.pathname !== '/callback') updateUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
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
          element: (
            <Suspense fallback={<Loading />}>
              <PairRoomOnboarding />
            </Suspense>
          ),
        },
        {
          path: 'room',
          element: <PrivateRoutes />,
          children: [
            {
              path: ':accessCode',
              element: (
                <Suspense fallback={<Loading />}>
                  <PairRoom />
                </Suspense>
              ),
            },
            {
              path: ':accessCode/completed',
              element: (
                <Suspense fallback={<Loading />}>
                  <CompletedPairRoom />
                </Suspense>
              ),
            },
            {
              path: ':accessCode/retrospect',
              element: <RetrospectView />,
            },
            {
              path: ':accessCode/retrospectForm',
              element: <RetrospectForm />,
            },
          ],
        },
        {
          path: 'sign-up',
          element: <SignUp />,
        },
        {
          path: 'coduo-docs',
          element: <CoduoDocs />,
        },
        {
          path: 'callback',
          element: <Callback />,
        },
        {
          path: 'my-page',
          element: <MyPage />,
        },

        {
          path: 'error',
          element: <Error />,
        },
        {
          path: '*',
          element: <Error />,
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
