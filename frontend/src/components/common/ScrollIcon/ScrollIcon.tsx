import useScrollIcon from '@/hooks/common/useScrollIcon';

import * as S from './ScrollIcon.styles';

const ScrollIcon = () => {
  const { isBottom, handleClick } = useScrollIcon();

  return (
    <S.Layout onClick={handleClick} $isBottom={isBottom}>
      <S.ScrollIcon size="3rem" $isBottom={isBottom} />
    </S.Layout>
  );
};

export default ScrollIcon;
