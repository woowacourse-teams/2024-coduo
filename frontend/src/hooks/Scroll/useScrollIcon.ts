import { useState, useEffect } from 'react';

const useScrollIcon = () => {
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

  return { isBottom, handleClick };
};

export default useScrollIcon;
