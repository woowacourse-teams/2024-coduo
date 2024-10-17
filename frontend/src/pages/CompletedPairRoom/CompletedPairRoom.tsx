import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GithubLogoWhite } from '@/assets';

import Loading from '@/pages/Loading/Loading';

import { ScrollAnimationContainer } from '@/components/common/Animation/ScrollAnimationContainer';
import Button from '@/components/common/Button/Button';
import ReferenceCard from '@/components/CompletedPairRoom/ReferenceCard/ReferenceCard';
import TodoListCard from '@/components/CompletedPairRoom/TodoListCard/TodoListCard';

import useUserStore from '@/stores/userStore';

import { getPairRoomExists } from '@/apis/pairRoom';

import useGetPairRoom from '@/queries/PairRoom/useGetPairRoom';

import * as S from './CompletedPairRoom.styles';

const CompletedPairRoom = () => {
  const navigate = useNavigate();
  const accessCode = useParams().accessCode;

  const userStatus = useUserStore((state) => state.userStatus);

  useEffect(() => {
    const checkPairRoomExists = async () => {
      if (!accessCode) navigate('/error');

      const { exists } = await getPairRoomExists(accessCode || '');

      if (!exists) navigate('/error');
    };
    checkPairRoomExists();
  }, [accessCode]);

  const handleRetrospectWriting = () => {
    // navigate(''); TODO: 회고 작성 페이지로 이동
  };

  const { driver, navigator, missionUrl, isFetching } = useGetPairRoom(accessCode || '');

  if (isFetching) {
    return <Loading />;
  }

  return (
    <S.Layout>
      <S.CompletedPairRoomInformationContainer>
        <ScrollAnimationContainer animationDirection="right">
          <S.Title>{accessCode}</S.Title>
        </ScrollAnimationContainer>
        <ScrollAnimationContainer animationDirection="right" animationDelay={0.2}>
          <S.PairInfo>
            <S.FirstPair>{driver}</S.FirstPair>와(과)&nbsp;
            <S.SecondPair>{navigator}</S.SecondPair>의 기록이에요.
          </S.PairInfo>
        </ScrollAnimationContainer>
        <ScrollAnimationContainer animationDirection="right" animationDelay={0.4}>
          {missionUrl && (
            <S.RepositoryLink href={missionUrl} target="_blank">
              <S.GithubLogo src={GithubLogoWhite} />
              미션 리포지토리 열기
            </S.RepositoryLink>
          )}
        </ScrollAnimationContainer>
        <ScrollAnimationContainer animationDirection="right" animationDelay={0.4}>
          <S.ButtonPromptContainer>
            <Button
              size="lg"
              disabled={userStatus === 'SIGNED_IN' ? false : true}
              onClick={() => {
                handleRetrospectWriting();
              }}
            >
              회고 작성
            </Button>
            <S.ButtonPrompt>
              {userStatus === 'SIGNED_IN'
                ? '이번 페어 프로그래밍은 어떠셨나요? 회고를 작성해주세요.'
                : '로그인 후 페어룸에 참여하면 회고를 작성할 수 있어요.'}
            </S.ButtonPrompt>
          </S.ButtonPromptContainer>
        </ScrollAnimationContainer>
      </S.CompletedPairRoomInformationContainer>
      <ScrollAnimationContainer animationDirection="top" animationDelay={0.4}>
        <TodoListCard />
      </ScrollAnimationContainer>
      <ScrollAnimationContainer animationDirection="top" animationDelay={0.6}>
        <ReferenceCard accessCode={accessCode || ''} />
      </ScrollAnimationContainer>
    </S.Layout>
  );
};

export default CompletedPairRoom;
