import * as S from './Toast.styles';

export type Status = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR';

interface ToastProps {
  isOpen: boolean;
  isPush: boolean;
  message: string;
  status?: Status;
}

const TOAST_IMOJI: Record<Status, string> = {
  SUCCESS: '✅',
  INFO: '📖',
  WARNING: '👀',
  ERROR: '⛔️',
};

const Toast = ({ isOpen, isPush, message, status = 'ERROR' }: ToastProps) => {
  return (
    <S.Layout $isOpen={isOpen} $isPush={isPush} $status={status}>
      {`${TOAST_IMOJI[status]} ${message}`}
    </S.Layout>
  );
};

export default Toast;
