import { Outlet } from 'react-router-dom';

import Header from '@/components/_common/Header/Header';
import ToastList from '@/components/_common/ToastList/ToastList';

import * as S from './Layout.styles';

const Layout = () => {
  return (
    <S.Layout>
      <Header />
      <S.Main role="presentation">
        <Outlet />
      </S.Main>
      <ToastList />
    </S.Layout>
  );
};

export default Layout;
