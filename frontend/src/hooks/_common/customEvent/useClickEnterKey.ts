import { useEffect, useRef } from 'react';

const useClickEnterKey = (isOpen: boolean) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEnterPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && buttonRef.current) buttonRef.current.click();
    };

    document.addEventListener('keydown', handleEnterPress);

    return () => document.removeEventListener('keydown', handleEnterPress);
  }, [isOpen]);

  return { buttonRef };
};

export default useClickEnterKey;
