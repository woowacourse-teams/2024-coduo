import { createPortal } from 'react-dom';

import useToastStore from '@/stores/toastStore';

import Toast from '@/components/common/Toast/Toast';


import * as S from './ToastList.styles';


const ToastList = () => {
  const { toastList } = useToastStore();

  return createPortal(
    <S.Layout>
      {toastList.map((item) => (
        <Toast key={item.id} isOpen={item.isOpen} isPush={item.isPush} message={item.message} status={item.status} />
      ))}
    </S.Layout>,
    document.body,
  );
};

export default ToastList;
