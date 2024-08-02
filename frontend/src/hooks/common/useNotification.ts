import { useRef, useEffect } from 'react';

import { LogoIcon } from '@/assets';

const useNotification = () => {
  const notificationRef = useRef<Notification | null>(null);

  const handleNotificationClick = (event: Event) => {
    event.preventDefault();
    window.focus();
    notificationRef.current?.close();
  };

  const requestPermission = async () => {
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
  };

  const fireNotification = (title: string, options: NotificationOptions) => {
    if (Notification.permission === 'granted' && !document.hasFocus()) {
      const newOption = {
        badge: LogoIcon,
        icon: LogoIcon,
        ...options,
      };
      const notification = new Notification(title, newOption);
      notificationRef.current = notification;
      notification.onclick = handleNotificationClick;
    } else {
      console.warn('알림 권한이 허용되지 않았습니다.');
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return { fireNotification };
};

export default useNotification;
