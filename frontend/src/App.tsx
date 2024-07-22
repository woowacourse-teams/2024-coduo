import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div></div>
    </ThemeProvider>
  );
};
export default App;
