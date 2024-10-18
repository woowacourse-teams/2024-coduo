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
    <S.Layout role="alert" aria-live="assertive" $isOpen={isOpen} $isPush={isPush} $status={status}>
      {/* TODO: 여기가 잘 안돼서 수정 부탁합니다,, 어떡하면 토스트가 읽힐까요..? */}
      {`${TOAST_IMOJI[status]} ${message}`}
    </S.Layout>
  );
};

export default Toast;
