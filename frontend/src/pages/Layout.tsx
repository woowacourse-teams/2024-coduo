import { Outlet } from 'react-router-dom';

import Header from '@/components/common/Header/Header';

import * as S from './Layout.styles';

const Layout = () => {
  return (
    <S.Layout>
      <Header />
      <main>
        <Outlet />
      </main>
    </S.Layout>
  );
};

export default Layout;
