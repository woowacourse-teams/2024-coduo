import { useEffect } from 'react';

const useEscapeKey = (isOpen: boolean, close: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleEscapePress, true);

    return () => document.removeEventListener('keydown', handleEscapePress, true);
  }, [isOpen, close]);
};

export default useEscapeKey;
