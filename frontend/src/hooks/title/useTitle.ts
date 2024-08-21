import { useEffect, useState } from 'react';

const useTitle = (minutes?: string, seconds?: string) => {
  const [title, setTitle] = useState('');

  const updateTitle = () => {
    const htmlTitle = document.querySelector('title');
    if (htmlTitle) htmlTitle.innerHTML = `${title} 코딩해듀오`;
  };

  const handleTitle = (title: string) => {
    setTitle(`${title} -`);
  };

  useEffect(updateTitle, [title]);
  useEffect(() => {
    if (!minutes || !seconds) return setTitle('');
    handleTitle(`${minutes}:${seconds}`);
  }, [minutes, seconds]);
};

export default useTitle;
