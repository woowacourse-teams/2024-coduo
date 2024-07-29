import { useState } from 'react';

type onCopyFn = (text: string) => Promise<boolean>;

const useCopyClipBoard = (): [boolean, onCopyFn] => {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const onCopy: onCopyFn = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);
      alert('클립보드에 복사되었습니다.');
      return true;
    } catch (error) {
      console.error(error);
      setIsCopy(false);
      alert('클립보드 복사에 실패했습니다.');

      return false;
    }
  };

  return [isCopy, onCopy];
};

export default useCopyClipBoard;
