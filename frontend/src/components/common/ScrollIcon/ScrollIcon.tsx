import { useState, useEffect } from 'react';

import * as S from './ScrollIcon.styles';

const ScrollIcon = () => {
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const atBottom = scrollPosition >= documentHeight - 80;
    setIsBottom(atBottom);
  };

  const handleClick = () => {
    if (isBottom) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <S.Layout onClick={handleClick} $isBottom={isBottom}>
      <S.ScrollIcon size="5rem" $isBottom={isBottom} />
      <S.Text>Scroll</S.Text>
    </S.Layout>
  );
};

export default ScrollIcon;
