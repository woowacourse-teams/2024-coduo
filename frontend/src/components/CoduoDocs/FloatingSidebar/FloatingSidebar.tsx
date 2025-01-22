import * as S from './FloatingSidebar.styles';

const FloatingSidebar = ({ children }: React.PropsWithChildren) => {
  return <S.Layout>{children}</S.Layout>;
};

export default FloatingSidebar;
