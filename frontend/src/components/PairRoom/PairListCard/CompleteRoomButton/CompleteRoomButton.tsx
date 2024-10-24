import { ImExit } from 'react-icons/im';

import useUserStore from '@/stores/userStore';

import useCompletePairRoom from '@/queries/PairRoom/useCompletePairRoom';

import * as S from './CompleteRoomButton.styles';

interface CompleteRoomButtonProps {
  isOpen: boolean;
  accessCode: string;
}

const CompleteRoomButton = ({ isOpen, accessCode }: CompleteRoomButtonProps) => {
  const { userStatus } = useUserStore();

  const { handleCompletePairRoom } = useCompletePairRoom(accessCode);

  const isDisabled = userStatus !== 'SIGNED_IN';

  return (
    <S.Layout
      onClick={handleCompletePairRoom}
      disabled={isDisabled}
      aria-label={isDisabled ? '로그인 후 페어룸을 종료할 수 있습니다. ' : '클릭하시면 페어룸이 종료됩니다.'}
    >
      {isDisabled ? (
        <S.StyledTooltip message="로그인 후 페어룸에 참여하면 방을 종료할 수 있습니다." direction="top">
          <ImExit size="1.5rem" />
          {isOpen && <span>&nbsp;페어룸 종료하기</span>}
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
