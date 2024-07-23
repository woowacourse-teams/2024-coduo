import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import Layout from '@/pages/Layout';
import Main from '@/pages/Main/Main';
import PairRoom from '@/pages/PairRoom/PairRoom';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

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
          path: 'room',
          element: <PairRoom />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
export default App;
