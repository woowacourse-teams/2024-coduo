import * as S from './InputField.styles';

interface LayoutProps {
  width?: string;
  height?: string;
  gap?: string;
}

const Layout = ({
  width = '100%',
  height = '100%',
  gap = '0.8rem',
  children,
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <S.Layout $height={height} $width={width} $gap={gap}>
      {children}
    </S.Layout>
  );
};

export default Layout;
