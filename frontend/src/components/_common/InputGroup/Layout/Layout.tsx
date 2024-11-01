import * as S from './Layout.styles';

interface LayoutProps {
  width?: string;
  gap?: string;
}

const Layout = ({ width = '100%', gap = '0.8rem', children }: React.PropsWithChildren<LayoutProps>) => {
  return (
    <S.Layout $width={width} $gap={gap}>
      {children}
    </S.Layout>
  );
};

export default Layout;
