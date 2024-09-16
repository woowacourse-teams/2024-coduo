import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useHashScroll = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(location.hash.replace('#', ''));
  const isScrollingRef = useRef(false);

  const handleActiveSection = (activeSection: string) => {
    setActiveSection(activeSection);
  };

  useEffect(() => {
    if (!activeSection) return;

    const element = document.getElementById(activeSection);
    if (element) {
      isScrollingRef.current = true;
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location, activeSection]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection);

    document.querySelectorAll('section[id], div[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [navigate, location.hash]);

  return { activeSection, handleActiveSection };
};

export default useHashScroll;
