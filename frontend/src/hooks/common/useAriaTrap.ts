import { useEffect } from 'react';

const useAriaTrap = (isOpen: boolean, elementId: string) => {
  useEffect(() => {
    const element = document.getElementById(elementId);

    if (!element) return;

    if (isOpen) {
      element.setAttribute('aria-hidden', 'true');
    } else {
      element.removeAttribute('aria-hidden');
    }

    return () => element.removeAttribute('aria-hidden');
  }, [isOpen]);
};

export default useAriaTrap;
