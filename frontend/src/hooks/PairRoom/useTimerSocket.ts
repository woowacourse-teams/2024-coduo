import { useState, useRef, useEffect } from 'react';

import { AlarmSound } from '@/assets';

import useSocketStore from '@/stores/socketStore';
import useToastStore from '@/stores/toastStore';

import { startTimer, stopTimer } from '@/apis/http/timer';
import { subscribeTopic } from '@/apis/websocket/websocket';

import useNotification from '@/hooks/PairRoom/useNotification';

enum TimerStatus {
  START = 'START',
  RUNNING = 'RUNNING',
  PAUSE = 'PAUSE',
  UPDATE = 'UPDATE',
}

const useTimer = (defaultTime: number, defaultTimeLeft: number, onTimerStop: () => void) => {
  const durationRef = useRef(defaultTime);

  const { client, isConnected, accessCode } = useSocketStore();
  const { addToast } = useToastStore();

  const [timeLeft, setTimeLeft] = useState(defaultTimeLeft);
  const [isActive, setIsActive] = useState(false);

  const alarmAudio = useRef(new Audio(AlarmSound));

  const { fireNotification } = useNotification();

  const handleStart = () => {
    if (!isActive) startTimer(accessCode);
  };

  const handlePause = () => {
    if (isActive) stopTimer(accessCode);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(durationRef.current);
    onTimerStop();

    // 타이머 종료 알람 플레이
    alarmAudio.current.play();
    fireNotification('타이머가 끝났어요!', '드라이버 / 내비게이터 역할을 바꿔 주세요!', { requireInteraction: true });

    addToast({ status: 'SUCCESS', message: '타이머가 종료되었습니다.' });
    addToast({ status: 'INFO', message: '드라이버 / 내비게이터 역할을 바꿔 주세요!' });
  };

  const handleTimerEvent = (timeLeft: number) => {
    if (timeLeft === 0) {
      handleStop();
      return;
    }

    setTimeLeft(timeLeft);
  };

  const handleTimerStatusEvent = (status: TimerStatus, data: number | null) => {
    switch (status) {
      case TimerStatus.START:
        setIsActive(true);
        addToast({ status: 'SUCCESS', message: '타이머가 시작되었습니다.' });
        break;

      case TimerStatus.RUNNING:
        setIsActive(true);
        addToast({ status: 'WARNING', message: '타이머가 진행 중입니다.' });
        break;

      case TimerStatus.PAUSE:
        setIsActive(false);
        addToast({ status: 'WARNING', message: '타이머가 일시 정지되었습니다.' });
        break;

      case TimerStatus.UPDATE:
        if (data) {
          durationRef.current = data;
          setTimeLeft(data);
          addToast({ status: 'WARNING', message: '타이머 시간이 변경되었습니다.' });
        }
        break;

      default:
        addToast({ status: 'ERROR', message: '예상하지 못한 에러가 발생했습니다.' });
    }
  };

  useEffect(() => {
    const unsubscribeTopics = () => {
      if (client && isConnected) {
        client.unsubscribe(`/topic/${accessCode}/timer`);
        client.unsubscribe(`/topic/${accessCode}/timer/status`);
      }
    };

    const handleBeforeUnload = () => {
      unsubscribeTopics();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    if (client && isConnected) {
      // 타이머 남은 시간
      subscribeTopic<{ data: number }>(client, `/topic/${accessCode}/timer`, (body) => handleTimerEvent(body.data));

      // 타이머 상태
      subscribeTopic<{ status: TimerStatus; data: number | null }>(
        client,
        `/topic/${accessCode}/timer/status`,
        (body) => handleTimerStatusEvent(body.status, body.data),
      );
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      unsubscribeTopics();
    };
  }, [client, isConnected]);

  return {
    duration: durationRef.current,
    timeLeft,
    isActive,
    handleStart,
    handlePause,
  };
};

export default useTimer;
