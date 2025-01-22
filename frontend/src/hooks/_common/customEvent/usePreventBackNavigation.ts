import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const usePreventBackNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      navigate(1);
    };

    window.addEventListener('popstate', handlePopState);

    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
};

export default usePreventBackNavigation;
