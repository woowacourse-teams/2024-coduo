import * as S from './Content.styles';

interface ContentProps {
  gap?: string;
}

const Content = ({ gap = '1rem', children }: React.PropsWithChildren<ContentProps>) => {
  return <S.Layout $gap={gap}>{children}</S.Layout>;
};

export default Content;
