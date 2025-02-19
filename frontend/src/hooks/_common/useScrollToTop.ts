import { useEffect } from 'react';

const useScrollToTop = () => {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTop;
