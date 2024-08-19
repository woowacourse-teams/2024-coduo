import { useState, useEffect } from 'react';

const useScrollIcon = () => {
  const [showScrollIcon, setShowScrollIcon] = useState(true);

  const handleScroll = () => {
    const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    setShowScrollIcon(!isBottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return showScrollIcon;
};

export default useScrollIcon;
