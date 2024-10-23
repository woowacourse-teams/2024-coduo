import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import RetrospectButtonDisabled from '@/components/CompletedPairRoom/RetrospectButton/RetroSpectButtonDisabled';

import { useGetUserIsInPairRoom } from '@/queries/CompletedPairRoom/useGetUserIsInPairRoom';
import { useGetUserRetrospectExists } from '@/queries/CompletedPairRoom/useGetUserRetrospectExists';

import * as S from './RetrospectButton.styles';

interface RetrospectButtonProps {
  accessCode: string;
}

const RetrospectButton = ({ accessCode }: RetrospectButtonProps) => {
  const navigate = useNavigate();
  const { data: isUserInPairRoom } = useGetUserIsInPairRoom(accessCode);

  const { data: isUserRetrospectExist } = useGetUserRetrospectExists(accessCode);

  if (!isUserInPairRoom) return <RetrospectButtonDisabled />;

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
          ? '작성된 회고를 확인하러 가 볼까요?'
          : '이번 페어 프로그래밍은 어떠셨나요? 회고를 작성해주세요.'}
      </S.ButtonPrompt>
    </S.Layout>
  );
};

export default RetrospectButton;
