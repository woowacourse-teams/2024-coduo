import useScrollIcon from '@/hooks/Scroll/useScrollIcon';

import * as S from './ScrollIcon.styles';

const ScrollIcon = () => {
  const { isBottom, handleClick } = useScrollIcon();

  return (
    <S.Layout onClick={handleClick} $isBottom={isBottom}>
      <S.ScrollIcon size="5rem" $isBottom={isBottom} />
      <S.Text>Scroll</S.Text>
    </S.Layout>
  );
};

export default ScrollIcon;
