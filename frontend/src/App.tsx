import { useEffect, Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

const PairRoom = lazy(() => import('@/pages/PairRoom/PairRoom'));
const PairRoomOnboarding = lazy(() => import('@/pages/PairRoomOnboarding/PairRoomOnboarding'));

import Callback from '@/pages/Callback/Callback';
import Docs from '@/pages/CoduoDocs/CoduoDocs';
import PageNotFound from '@/pages/Error/PageNotFound/PageNotFound';
import HowToPair from '@/pages/HowToPair/HowToPair';
import Landing from '@/pages/Landing/Landing';
import Layout from '@/pages/Layout';
import Loading from '@/pages/Loading/Loading';
import Main from '@/pages/Main/Main';
import SignUp from '@/pages/SignUp/SignUp';

import useToastStore from '@/stores/toastStore';
import useUserStatusStore from '@/stores/userStatusStore';

import { getIsUserLoggedIn } from '@/apis/oauth';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

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

  const { addToast } = useToastStore();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
        retry: 0,
      },
      mutations: {
        retry: 1,
      },
    },
    mutationCache: new MutationCache({
      onError: (error) => addToast({ status: 'ERROR', message: error.message }),
    }),
  });

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
          path: 'pair-room/:accessCode',
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
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
export default App;
