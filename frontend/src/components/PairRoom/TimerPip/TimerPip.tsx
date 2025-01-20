import { useEffect, useRef } from 'react';

import { styles } from '@/components/PairRoom/TimerPip/TimerPip.styles';

interface TimerPip {
  minutes: string;
  seconds: string;
  progress: number;
}

declare global {
  interface Window {
    documentPictureInPicture: {
      requestWindow: (options?: { width?: number; height?: number }) => Promise<Window>;
    };
  }
}

const TimerPip = ({ minutes, seconds, progress }: TimerPip) => {
  const pipWindowRef = useRef<Window | null>(null);
  const isPipOpenRef = useRef(false);

  const openPiP = async () => {
    if (pipWindowRef.current || isPipOpenRef.current) return;

    isPipOpenRef.current = true;

    try {
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 250,
        height: 180,
      });
      pipWindowRef.current = pipWindow;

      const styleElement = pipWindow.document.createElement('style');

      styleElement.textContent = styles;
      pipWindow.document.head.appendChild(styleElement);

      const timerElement = pipWindow.document.createElement('div');
      timerElement.className = 'pipWindow';
      pipWindow.document.body.appendChild(timerElement);

      pipWindow.addEventListener('unload', () => {
        pipWindowRef.current = null;
        isPipOpenRef.current = false;
      });

      updatePiPContent(pipWindow);
    } catch (error) {
      console.error('PiP 윈도우 생성 실패:', error);
      isPipOpenRef.current = false;
    }
  };

  const updatePiPContent = (window: Window) => {
    const timerElement = window.document.querySelector('.pipWindow');
    if (!timerElement) return;

    timerElement.innerHTML = `
      <div class="layout">
        <div class="container">
          <div class="timer-container">
            <span class="timer-text">${minutes}</span>
          </div>
          <span class="timer-text">:</span>
          <div class="timer-container">
            <span class="timer-text">${seconds}</span>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: ${progress}%"></div>
        </div>
        </div>
      </div>
    `;
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isPipOpenRef.current) {
        openPiP();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (pipWindowRef.current) {
      updatePiPContent(pipWindowRef.current);
    }
  }, [minutes, seconds, progress]);

  return null;
};

export default TimerPip;
