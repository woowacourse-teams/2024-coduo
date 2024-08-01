import Toast from '@/components/common/Toast/Toast';

import * as S from './ToastList.styles';

const TOAST_LIST = ['에러 메시지 1', '에러 메시지 2', '에러 메시지 3'];

const ToastList = () => {
  return (
    <S.Layout>
      {TOAST_LIST.map((message) => (
        <Toast key={message} isOpen={true} message={message} />
      ))}
    </S.Layout>
  );
};

export default ToastList;
