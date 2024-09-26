import { useState, useEffect } from 'react';

import { TargetSection } from '@/components/common/ScrollIcon/ScrollIcon';

interface UseScrollIconProps {
  targetSections?: TargetSection[];
}

const useScrollIcon = ({ targetSections }: UseScrollIconProps) => {
  const defaultSections: TargetSection[] = [
    { id: 'top', position: 'top' },
    { id: 'bottom', position: 'bottom' },
  ];

  const sections = targetSections && targetSections.length > 0 ? targetSections : defaultSections;

  const [currentSection, setCurrentSection] = useState<string>(sections[0].id);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    if (!targetSections && window.scrollY < 50) {
      setCurrentSection('top');
      return;
    }
    if (!targetSections && window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
      setCurrentSection('bottom');
      return;
    }

    const isInView = (element: HTMLElement, scrollPosition: number) => {
      const elementTop = element.offsetTop;
      const elementBottom = elementTop + element.offsetHeight;
      return scrollPosition >= elementTop && scrollPosition < elementBottom;
    };

    sections.some((section) => {
      const element = document.getElementById(section.id);
      if (element && isInView(element, scrollPosition)) {
        setCurrentSection(section.id);
        return true;
      }
      return false;
    });
  };

  const handleClick = () => {
    const currentIndex = sections.findIndex((section) => section.id === currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextSection = sections[nextIndex];

    switch (nextSection.id) {
      case 'top':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'bottom':
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        break;
      default:
        document.getElementById(nextSection.id)?.scrollIntoView({ behavior: 'smooth' });
    }

    setCurrentSection(nextSection.id);
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
