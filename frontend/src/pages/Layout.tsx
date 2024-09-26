import { Outlet } from 'react-router-dom';

import Header from '@/components/common/Header/Header';
import ToastList from '@/components/common/ToastList/ToastList';

import * as S from './Layout.styles';

const Layout = () => {
  return (
    <S.Layout>
      <Header />
      <main>
        <Outlet />
      </main>
      <ToastList />
    </S.Layout>
  );
};

export default Layout;
