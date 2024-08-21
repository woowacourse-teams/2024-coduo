import { useState } from 'react';

const useAutoMoveIndex = (defaultIndex: number, validationList: boolean[], isTyping: boolean) => {
  const [index, setIndex] = useState(defaultIndex);

  const handleIndex = (nextIndex: number) => nextIndex > index && setIndex(nextIndex);

  if (!isTyping && validationList.some(Boolean)) {
    const nextIndex = defaultIndex + validationList.filter(Boolean).length;
    handleIndex(nextIndex);
  }

  return { moveIndex: index };
};

export default useAutoMoveIndex;
