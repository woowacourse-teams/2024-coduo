import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import RetrospectButtonDisabled from '@/components/CompletedPairRoom/RetrospectButton/RetroSpectButtonDisabled';

import { useGetUserPairRoomExists } from '@/queries/CompletedPairRoom/useGetUserPairRoomExists';
import { useGetUserRetrospectExists } from '@/queries/CompletedPairRoom/useGetUserRetrospectExists';

import * as S from './RetrospectButton.styles';

const id = 1; //TODO: 회고 api 연동 후 삭제

interface RetrospectButtonProps {
  accessCode: string;
}

const RetrospectButton = ({ accessCode }: RetrospectButtonProps) => {
  const navigate = useNavigate();
  const { data: isUserInPairRoom } = useGetUserPairRoomExists(accessCode);

  const { data: isUserRetrospectExist } = useGetUserRetrospectExists(accessCode);

  if (!isUserInPairRoom) return <RetrospectButtonDisabled />;

  const handleRetrospectButtonClick = () => {
    if (isUserRetrospectExist) {
      navigate(`/retrospect/${id}`);
    } else {
      navigate(`/retrospect`, { state: { accessCode } });
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
