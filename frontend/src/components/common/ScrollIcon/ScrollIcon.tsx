import useScrollIcon from '@/hooks/common/useScrollIcon';

import * as S from './ScrollIcon.styles';
export interface TargetSection {
  id: string;
  position: 'top' | 'bottom';
}

interface ScrollIconProps {
  targetSections: TargetSection[];
  onClick?: () => void;
}

interface ScrollIconProps {
  targetSections: TargetSection[];
  onClick?: () => void;
}

const ScrollIcon = ({ targetSections, onClick }: ScrollIconProps) => {
  const { currentSection, handleClick } = useScrollIcon({ targetSections });

  const isBottom = currentSection === targetSections[targetSections.length - 1].id;

  return (
    <S.Layout onClick={onClick ? onClick : handleClick} $isBottom={isBottom}>
      <S.ScrollIcon size="3rem" $isBottom={isBottom} />
    </S.Layout>
  );
};

export default ScrollIcon;
