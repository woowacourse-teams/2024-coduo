import { ThemeProvider } from 'styled-components';

import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';
import { Modal } from '@/components/common/Modal';

import GlobalStyles from './styles/Global.style';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Modal isOpen={true} close={() => {}}>
        <Dropdown
          placeholder="선택해주세요"
          options={['옵션1', '옵션2', '옵션3']}
          onSelect={(value) => console.log(value)}
        />
      </Modal>
    </ThemeProvider>
  );
};
export default App;
