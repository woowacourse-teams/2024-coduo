import * as S from './Body.styles';

const Body = ({ children }: React.PropsWithChildren) => {
  return <S.Layout>{children}</S.Layout>;
};

export default Body;
