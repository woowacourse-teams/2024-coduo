import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useHashScroll = () => {
  const location = useLocation();
  const currentHash = location.hash.replace('#', '');
  const [activeSection, setActiveSection] = useState(currentHash);
  const isProcessingRef = useRef(false);

  const handleActiveSection = (section: string) => setActiveSection(section);

  /**
   * 스크롤 이벤트를 감지하여 현재 뷰포트에 보이는 섹션의 id 값에 따라 activeSection 업데이트
   * - 요소가 뷰포트에 진입하는 순간 활성화
   * - 요소가 뷰포트 상단에서 보이기 시작하는 순간부터 하단에 도달하기 직전까지의 모든 위치를 포함
   * - isProcessingRef 를 통해 진행중일때 불필요한 계산을 하지 않도록 함.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (isProcessingRef.current) return;

      requestAnimationFrame(() => {
        const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id], div[id], p[id]'));
        const viewportHeight = window.innerHeight;

        const visibleSection = sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= viewportHeight;
        });

        if (visibleSection && visibleSection.id !== activeSection) {
          handleActiveSection(visibleSection.id);
        }

        isProcessingRef.current = false;
      });

      isProcessingRef.current = true;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  /**
   * url 의 해시값을 기반으로 스크롤 이동
   */
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(currentHash);
      if (element) {
        const headerHeight = 70;
        const marginTop = 50;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight - marginTop;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [location, currentHash]);

  return { activeSection };
};

export default useHashScroll;
