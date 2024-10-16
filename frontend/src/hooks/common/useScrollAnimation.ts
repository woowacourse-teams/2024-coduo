import { useEffect, useRef, useState } from 'react';

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useScrollAnimation = (options: IntersectionObserverOptions = {}) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          setHasAnimated(true);
        } else if (!hasAnimated) {
          setIsInViewport(false);
        }
      });
    };
    const observerOptions = { ...options };

    const observer = new IntersectionObserver(callback, observerOptions);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options, hasAnimated]);

  return { isInViewport: hasAnimated || isInViewport, ref };
};
