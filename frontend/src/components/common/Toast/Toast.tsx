import * as S from './Toast.styles';

export type Status = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR';

interface ToastProps {
  isOpen: boolean;
  isPush: boolean;
  message: string;
  status?: Status;
}

const Toast = ({ isOpen, isPush, message, status = 'ERROR' }: ToastProps) => {
  return (
    <S.Layout $isOpen={isOpen} $isPush={isPush} $status={status}>
      {message}
    </S.Layout>
  );
};

export default Toast;
