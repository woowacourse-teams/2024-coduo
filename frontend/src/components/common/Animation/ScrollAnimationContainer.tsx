import { useScrollAnimation } from '@/hooks/animations/useScrollAnimation';

import * as S from './ScrollAnimationContainer.styles';

interface PropsType {
  children: React.ReactNode;
}

export const ScrollAnimationContainer = ({ children }: PropsType) => {
  const { ref, isInViewport, hasAnimated } = useScrollAnimation();
  return (
    <S.Container ref={ref} className={isInViewport ? 'frame-in' : ''} $hasAnimated={hasAnimated}>
      {children}
    </S.Container>
  );
};
