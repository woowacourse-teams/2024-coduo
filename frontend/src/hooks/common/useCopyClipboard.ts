import { useState } from 'react';

import useToastStore from '@/stores/toastStore';

type onCopyFn = (text: string) => Promise<void>;

const useCopyClipBoard = () => {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const { addToast } = useToastStore();

  const onCopy: onCopyFn = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);
      addToast({ status: 'SUCCESS', message: '클립보드에 복사되었습니다.' });
    } catch (error) {
      setIsCopy(false);
      addToast({ status: 'ERROR', message: '클립보드에 복사에 실패했습니다.' });
    }
  };

  return { isCopy, onCopy };
};

export default useCopyClipBoard;
