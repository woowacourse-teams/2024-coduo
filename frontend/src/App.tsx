import { useEffect, Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

const PairRoom = lazy(() => import('@/pages/PairRoom/PairRoom'));

import Callback from '@/pages/Callback/Callback';
import Docs from '@/pages/CoduoDocs/CoduoDocs';
import PageNotFound from '@/pages/Error/PageNotFound';
import HowToPair from '@/pages/HowToPair/HowToPair';
import Landing from '@/pages/Landing/Landing';
import Layout from '@/pages/Layout';
import Loading from '@/pages/Loading/Loading';
import Main from '@/pages/Main/Main';
import MyPage from '@/pages/MyPage/MyPage';
import PairRoomOnboarding from '@/pages/PairRoomOnboarding/PairRoomOnboarding';
import SignUp from '@/pages/SignUp/SignUp';

import useUserStore from '@/stores/userStore';

import { getMember } from '@/apis/member';
import { getIsUserLoggedIn } from '@/apis/oauth';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

const App = () => {
  const { setUser } = useUserStore();

  const updateUser = async () => {
    const userStatus = await getIsUserLoggedIn();
    const username = await getMember();

    setUser(username, userStatus.signedIn ? 'SIGNED_IN' : 'SIGNED_OUT');
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') updateUser();
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
          element: (
            <Suspense fallback={<Loading />}>
              <PairRoomOnboarding />{' '}
            </Suspense>
          ),
        },
        {
          path: 'pair-room/:accessCode',
          element: (
            <Suspense fallback={<Loading />}>
              <PairRoom />
            </Suspense>
          ),
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
        {
          path: 'my-page',
          element: <MyPage />,
        },
        {
          path: '*',
          element: <PageNotFound />,
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
