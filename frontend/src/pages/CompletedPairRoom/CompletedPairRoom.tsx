import { useParams } from 'react-router-dom';

import { GithubLogoWhite } from '@/assets';

import Loading from '@/pages/Loading/Loading';

import { ScrollAnimationContainer } from '@/components/common/Animation/ScrollAnimationContainer';
import ReferenceCard from '@/components/CompletedPairRoom/ReferenceCard/ReferenceCard';
import RetrospectButton from '@/components/CompletedPairRoom/RetrospectButton/RetrospectButton';
import RetrospectButtonDisabled from '@/components/CompletedPairRoom/RetrospectButton/RetroSpectButtonDisabled';
import TodoListCard from '@/components/CompletedPairRoom/TodoListCard/TodoListCard';

import useUserStore from '@/stores/userStore';

import useGetPairRoom from '@/queries/PairRoom/useGetPairRoom';

import * as S from './CompletedPairRoom.styles';

const CompletedPairRoom = () => {
  const { accessCode } = useParams();

  const { userStatus } = useUserStore();
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
          {userStatus === 'SIGNED_IN' ? (
            <RetrospectButton accessCode={accessCode || ''} />
          ) : (
            <RetrospectButtonDisabled />
          )}
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
