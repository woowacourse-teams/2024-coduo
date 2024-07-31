import { useEffect } from 'react';

const preventScroll = () => {
  const currentScrollY = window.scrollY;

  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${currentScrollY}px`;
  document.body.style.overflowY = 'scroll';

  return currentScrollY;
};

const allowScroll = (prevScrollY: number) => {
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  document.body.style.overflowY = '';

  window.scrollTo(0, prevScrollY);
};

const usePreventScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (!isOpen) return;

    const prevScrollY = preventScroll();

    return () => allowScroll(prevScrollY);
  }, [isOpen]);
};

export default usePreventScroll;
