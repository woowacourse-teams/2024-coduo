import { ImExit } from 'react-icons/im';

import useUserStore from '@/stores/userStore';

import * as S from './CompleteRoomButton.styles';

interface CompleteRoomButtonProps {
  isOpen: boolean;
  openModal: () => void;
}

const CompleteRoomButton = ({ isOpen, openModal }: CompleteRoomButtonProps) => {
  const { userStatus } = useUserStore();

  const isDisabled = userStatus !== 'SIGNED_IN';

  return (
    <S.Layout
      onClick={openModal}
      disabled={isDisabled}
      aria-label={isDisabled ? '로그인 후 페어룸을 종료할 수 있습니다. ' : '클릭하시면 페어룸이 종료됩니다.'}
    >
      {isDisabled ? (
        <S.StyledTooltip message="로그인 후 페어룸을 종료할 수 있습니다." direction="top">
          <S.TextWrapper>
            <ImExit size="1.5rem" />
            {isOpen && <span>페어룸 종료하기</span>}
          </S.TextWrapper>
        </S.StyledTooltip>
      ) : (
        <>
          <ImExit size="1.5rem" />
          {isOpen && <span>페어룸 종료하기</span>}
        </>
      )}
    </S.Layout>
  );
};

export default CompleteRoomButton;
