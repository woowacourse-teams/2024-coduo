import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GithubLogoWhite } from '@/assets';

import Loading from '@/pages/Loading/Loading';

import Button from '@/components/common/Button/Button';
import ReferenceCard from '@/components/CompletedPairRoom/ReferenceCard/ReferenceCard';
import TodoListCard from '@/components/CompletedPairRoom/TodoListCard/TodoListCard';

import useUserStore from '@/stores/userStore';

import { getPairRoomExists } from '@/apis/pairRoom';

import useGetPairRoom from '@/queries/PairRoom/useGetPairRoom';

import * as S from './CompletedPairRoom.styles';

const CompletedPairRoom = () => {
  const navigate = useNavigate();
  const { accessCode } = useParams();

  const userStatus = useUserStore((state) => state.userStatus);

  useEffect(() => {
    const checkPairRoomExists = async () => {
      if (!accessCode) navigate('/error');

      const { exists } = await getPairRoomExists(accessCode || '');

      if (!exists) navigate('/error');
    };
    checkPairRoomExists();
  }, [accessCode]);

  const handleReviewWriting = () => {
    // navigate(); TODO: 회고 작성 페이지로 이동
  };

  const { driver, navigator, missionUrl, isFetching } = useGetPairRoom(accessCode || '');

  if (isFetching) {
    return <Loading />;
  }

  return (
    <S.Layout>
      <S.CompletedPairRoomInformationContainer>
        <S.Title>{accessCode}</S.Title>
        <S.PairInfo>
          <S.FirstPair>{driver}</S.FirstPair>과&nbsp;
          <S.SecondPair>{navigator}</S.SecondPair>이 함께했던 페어룸이에요.
        </S.PairInfo>
        {missionUrl && (
          <S.RepositoryLink href={missionUrl} target="_blank">
            <S.GithubLogo src={GithubLogoWhite} />
            미션 리포지토리로 이동
          </S.RepositoryLink>
        )}
        {userStatus === 'SIGNED_IN' ? ( // TODO: 회고 작성 여부 확인 로직 추가
          <Button
            size="lg"
            onClick={() => {
              handleReviewWriting();
            }}
          >
            회고 작성
          </Button>
        ) : (
          <S.LoginPromptContainer>
            <Button size="lg" disabled={true}>
              회고 작성
            </Button>
            <S.LoginPrompt>로그인하면 회고를 작성할 수 있어요.</S.LoginPrompt>
          </S.LoginPromptContainer>
        )}
      </S.CompletedPairRoomInformationContainer>
      <TodoListCard />
      <ReferenceCard accessCode={accessCode || ''} />
    </S.Layout>
  );
};

export default CompletedPairRoom;
