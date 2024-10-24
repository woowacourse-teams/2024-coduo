import useScrollIcon from '@/hooks/common/useScrollIcon';

import * as S from './ScrollIcon.styles';

export interface TargetSection {
  id: string;
  position: 'top' | 'bottom';
}
interface ScrollIconProps {
  targetSections?: TargetSection[];
}

const ScrollIcon = ({ targetSections }: ScrollIconProps) => {
  const { currentSection, handleClick } = useScrollIcon({ targetSections });

  const isBottom =
    currentSection ===
    (targetSections && targetSections.length > 0 ? targetSections[targetSections.length - 1].id : 'bottom');

  return (
    <S.Layout onClick={handleClick} $isBottom={isBottom}>
      <S.ScrollIcon
        tabIndex={0}
        role="button"
        aria-label={isBottom ? '위로 스크롤' : '아래로 스크롤'}
        size="3rem"
        $isBottom={isBottom}
      />
    </S.Layout>
  );
};

export default ScrollIcon;
