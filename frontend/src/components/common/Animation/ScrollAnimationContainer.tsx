import { useScrollAnimation } from '@/hooks/animations/useScrollAnimation';

import * as S from './ScrollAnimationContainer.styles';

export const ScrollAnimationContainer = ({ children }: React.PropsWithChildren) => {
  const { ref, isInViewport } = useScrollAnimation();
  return (
    <S.Container ref={ref} className={isInViewport ? 'frame-in' : ''}>
      {children}
    </S.Container>
  );
};
