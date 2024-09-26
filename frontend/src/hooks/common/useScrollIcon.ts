import { useState, useEffect } from 'react';

import { TargetSection } from '@/components/common/ScrollIcon/ScrollIcon';

interface UseScrollIconProps {
  targetSections: TargetSection[];
}

const useScrollIcon = ({ targetSections }: UseScrollIconProps) => {
  const [currentSection, setCurrentSection] = useState<string>(targetSections[0].id);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const section of targetSections) {
      const element = document.getElementById(section.id);
      if (element) {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          setCurrentSection(section.id);
          break;
        }
      }
    }
  };

  const handleClick = () => {
    const currentIndex = targetSections.findIndex((section) => section.id === currentSection);
    const nextIndex = (currentIndex + 1) % targetSections.length;
    const nextSection = targetSections[nextIndex];

    document.getElementById(nextSection.id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { currentSection, handleClick };
};

export default useScrollIcon;
