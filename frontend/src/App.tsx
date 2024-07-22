import { ThemeProvider } from 'styled-components';

import Header from '@/components/common/Header/Header';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div>
        <Header />
      </div>
    </ThemeProvider>
  );
};
export default App;
