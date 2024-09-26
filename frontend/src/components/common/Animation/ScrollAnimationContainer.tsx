import { IntersectionObserverOptions, useScrollAnimation } from '@/hooks/common/useScrollAnimation';

import * as S from './ScrollAnimationContainer.styles';

interface ScrollAnimationContainerProps {
  animationDirection: 'left' | 'right' | 'top' | 'bottom';
  animationDuration?: number;
  animationDelay?: number;
  intersectionObserverOptions?: IntersectionObserverOptions;
  children: React.ReactNode;
}

export const ScrollAnimationContainer = ({
  animationDirection = 'bottom',
  animationDuration = 1.2,
  animationDelay = 0,
  intersectionObserverOptions = {},
  children,
}: ScrollAnimationContainerProps) => {
  const { ref, isInViewport } = useScrollAnimation(intersectionObserverOptions);

  return (
    <S.Container
      ref={ref}
      className={isInViewport ? 'frame-in' : ''}
      $animationDirection={animationDirection}
      $animationDuration={animationDuration}
      $animationDelay={animationDelay}
    >
      {children}
    </S.Container>
  );
};
