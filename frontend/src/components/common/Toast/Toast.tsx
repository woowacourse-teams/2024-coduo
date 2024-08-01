import * as S from './Toast.styles';

export type Status = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR';

interface ToastProps {
  isOpen: boolean;
  message: string;
  status?: Status;
}

const Toast = ({ isOpen, message, status = 'ERROR' }: ToastProps) => {
  return (
    <S.Layout $isOpen={isOpen} $status={status}>
      {message}
    </S.Layout>
  );
};

export default Toast;
