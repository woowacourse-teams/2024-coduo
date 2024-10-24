import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Spinner from '@/components/common/Spinner/Spinner';

import useUserStore from '@/stores/userStore';

import { useGetUserIsInPairRoom } from '@/queries/CompletedPairRoom/useGetUserIsInPairRoom';
import { useGetUserRetrospectExists } from '@/queries/CompletedPairRoom/useGetUserRetrospectExists';

import * as S from './RetrospectButton.styles';

interface RetrospectButtonProps {
  accessCode: string;
}

const RetrospectButton = ({ accessCode }: RetrospectButtonProps) => {
  const navigate = useNavigate();

  const { userStatus } = useUserStore();

  const { isUserInPairRoom, isFetching: isUserInPairRoomFetching } = useGetUserIsInPairRoom(accessCode);
  const { isUserRetrospectExist, isFetching: isUserRetrospectExistsFetching } = useGetUserRetrospectExists(accessCode);

  const isLoading = isUserInPairRoomFetching || isUserRetrospectExistsFetching;
  if (isLoading) {
    return <Spinner />;
  }
  if (userStatus !== 'SIGNED_IN' || !isUserInPairRoom)
    return (
      <S.Layout>
        <Button size="lg" disabled={true}>
          회고 작성
        </Button>
        <S.ButtonPrompt>로그인 후 현재 페어룸에 등록된 사람만 회고를 작성할 수 있어요.</S.ButtonPrompt>
      </S.Layout>
    );

  const handleRetrospectButtonClick = async () => {
    if (isUserRetrospectExist) {
      navigate(`/room/${accessCode}/retrospect`, { state: { valid: true } });
    } else {
      navigate(`/room/${accessCode}/retrospectForm`, { state: { valid: true } });
    }
  };

  return (
    <S.Layout>
      <Button size="lg" onClick={handleRetrospectButtonClick}>
        {isUserRetrospectExist ? '회고 확인' : '회고 작성'}
      </Button>
      <S.ButtonPrompt>
        {isUserRetrospectExist
          ? '작성된 회고를 확인하러 가볼까요?'
          : '이번 페어 프로그래밍은 어떠셨나요? 회고를 작성해 주세요.'}
      </S.ButtonPrompt>
    </S.Layout>
  );
};

export default RetrospectButton;
