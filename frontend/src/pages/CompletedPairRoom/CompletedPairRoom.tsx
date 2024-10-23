import { Link, useParams } from 'react-router-dom';

import { GithubLogoWhite } from '@/assets';

import Loading from '@/pages/Loading/Loading';

import { ScrollAnimationContainer } from '@/components/common/Animation/ScrollAnimationContainer';
import ReferenceCard from '@/components/CompletedPairRoom/ReferenceCard/ReferenceCard';
import RetrospectButton from '@/components/CompletedPairRoom/RetrospectButton/RetrospectButton';
import TodoListCard from '@/components/CompletedPairRoom/TodoListCard/TodoListCard';

import useGetPairRoom from '@/queries/PairRoom/useGetPairRoom';

import * as S from './CompletedPairRoom.styles';

const CompletedPairRoom = () => {
  const { accessCode } = useParams();

  const { driver, navigator, missionUrl, isFetching } = useGetPairRoom(accessCode || '');

  if (isFetching) {
    return <Loading />;
  }

  return (
    <S.Layout>
      <ScrollAnimationContainer animationDirection="right">
        <S.InfoContainer>
          <S.TitleContainer>
            <S.Title>{accessCode}</S.Title>
            <S.PairInfoWrapper>
              <S.FirstPair>{driver}</S.FirstPair>와(과)&nbsp;
              <S.SecondPair>{navigator}</S.SecondPair>의 기록이에요
            </S.PairInfoWrapper>
          </S.TitleContainer>
          {missionUrl && (
            <Link to={missionUrl} target="_blank">
              <S.RepositoryButton>
                <S.GithubLogo src={GithubLogoWhite} />
                미션 리포지토리로 이동
              </S.RepositoryButton>
            </Link>
          )}
          <RetrospectButton accessCode={accessCode || ''} />
        </S.InfoContainer>
      </ScrollAnimationContainer>
      <S.CardContainer>
        <TodoListCard />
        <ReferenceCard accessCode={accessCode || ''} />
      </S.CardContainer>
    </S.Layout>
  );
};

export default CompletedPairRoom;
