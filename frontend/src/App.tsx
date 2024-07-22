import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import Main from '@/pages/Main';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
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
