import { IntersectionObserverOptions, useScrollAnimation } from '@/hooks/animations/useScrollAnimation';

import * as S from './ScrollAnimationContainer.styles';

interface ScrollAnimationContainerProps {
  animationDirection: 'left' | 'right' | 'top' | 'bottom';
  intersectionObserverOptions?: IntersectionObserverOptions;
  children: React.ReactNode;
}

export const ScrollAnimationContainer = ({
  animationDirection = 'bottom',
  intersectionObserverOptions = {},
  children,
}: ScrollAnimationContainerProps) => {
  const { ref, isInViewport } = useScrollAnimation(intersectionObserverOptions);

  return (
    <S.Container ref={ref} className={isInViewport ? 'frame-in' : ''} $animationDirection={animationDirection}>
      {children}
    </S.Container>
  );
};
