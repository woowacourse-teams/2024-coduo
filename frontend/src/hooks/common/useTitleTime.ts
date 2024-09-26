import { useEffect, useState } from 'react';

const useTitleTime = (minutes?: string, seconds?: string) => {
  const [titleTime, setTitleTime] = useState('');

  const updateTitle = () => {
    const htmlTitle = document.querySelector('title');
    if (htmlTitle) htmlTitle.innerHTML = `${titleTime} 코딩해듀오`;
  };

  const handleTitle = (title: string) => {
    setTitleTime(`${title} -`);
  };

  useEffect(updateTitle, [titleTime]);
  useEffect(() => {
    if (!minutes || !seconds) return setTitleTime('');
    handleTitle(`${minutes}:${seconds}`);
  }, [minutes, seconds]);
};

export default useTitleTime;
