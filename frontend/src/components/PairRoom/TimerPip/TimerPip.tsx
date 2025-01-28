import { useEffect, useRef } from 'react';

import { styles } from '@/components/PairRoom/TimerPip/TimerPip.styles';

interface TimerPip {
  minutes: string;
  seconds: string;
  progress: number;
  isActive: boolean;
  handleStart: () => void;
  handlePause: () => void;
}

declare global {
  interface Window {
    documentPictureInPicture: {
      requestWindow: (options?: { width?: number; height?: number }) => Promise<Window>;
    };
  }
}

const TimerPip = ({ minutes, seconds, progress, handleStart, handlePause, isActive }: TimerPip) => {
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

    if (!window.document.querySelector('.layout')) {
      timerElement.innerHTML = `
        <div class="layout">
          <div class="container">
            <div class="timer-container">
              <span class="timer-text"></span>
            </div>
            <span class="timer-text">:</span>
            <div class="timer-container">
              <span class="timer-text"></span>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill"></div>
          </div>
          <div class="button-container">
          </div>
        </div>
      `;
    }

    const minutesSpan = window.document.querySelector('.timer-container:first-child .timer-text');
    const secondsSpan = window.document.querySelector('.timer-container:last-child .timer-text');
    const progressBar = window.document.querySelector('.progress-bar-fill');
    const buttonContainer = window.document.querySelector('.button-container');

    if (minutesSpan) minutesSpan.textContent = minutes;
    if (secondsSpan) secondsSpan.textContent = seconds;
    if (progressBar) {
      progressBar.setAttribute('style', `width: ${progress}%`);
    }

    if (buttonContainer) {
      buttonContainer.innerHTML = isActive
        ? `<button class="pause-button">
          <svg width="20" height="20" viewBox="0 0 66 77" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.9 0C4.43438 0 0 4.29186 0 9.58182V67.0727C0 72.3627 4.43438 76.6546 9.9 76.6546H16.5C21.9656 76.6546 26.4 72.3627 26.4 67.0727V9.58182C26.4 4.29186 21.9656 0 16.5 0H9.9ZM49.5 0C44.0344 0 39.6 4.29186 39.6 9.58182V67.0727C39.6 72.3627 44.0344 76.6546 49.5 76.6546H56.1C61.5656 76.6546 66 72.3627 66 67.0727V9.58182C66 4.29186 61.5656 0 56.1 0H49.5Z" fill="#FFC453"/>
          </svg>
        </button>`
        : `<button class="play-button">
          <svg width="20" height="20" viewBox="0 0 85 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1589 1.32C12.8828 -0.381977 8.76562 -0.438087 5.42318 1.15167C2.08073 2.74143 0 5.73391 0 8.98824V74.8229C0 78.0772 2.08073 81.0697 5.42318 82.6595C8.76562 84.2492 12.8828 84.1744 16.1589 82.4912L79.9089 49.5738C83.0742 47.9467 85 45.0477 85 41.9056C85 38.7635 83.0742 35.8832 79.9089 34.2373L16.1589 1.32Z" fill="#FFC453"/>
          </svg>
        </button>`;

      const pauseButton = window.document.querySelector('.pause-button');
      const playButton = window.document.querySelector('.play-button');

      if (pauseButton) {
        pauseButton.addEventListener('click', handlePause);
      }
      if (playButton) {
        playButton.addEventListener('click', handleStart);
      }
    }
  };

  const button = window.document.querySelector('.button');
  button?.addEventListener('click', () => {
    if (isActive) {
      handleStart();
    } else {
      handlePause();
    }
  });

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
  }, [minutes, seconds, progress, isActive]);

  return null;
};

export default TimerPip;
