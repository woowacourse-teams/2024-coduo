import ContentBox from '@/components/CoduoDocs/ContentBox/ContentBox';
import FloatingSidebar from '@/components/CoduoDocs/FloatingSidebar/FloatingSidebar';
import Quote from '@/components/CoduoDocs/Quote/Quote';
import SourceCode from '@/components/CoduoDocs/SourceCode/SourceCode';
import Steps from '@/components/CoduoDocs/Steps/Steps';

import useScrollToTop from '@/hooks/_common/useScrollToTop';
import useHashScroll from '@/hooks/CoduoDocs/useHashScroll';

import {
  PAIR_PROGRAMMING_CONCEPT,
  START_WITH_MISSION,
  START_FREE,
  ABOUT_PAIR_PROGRAMMING,
  NOTIONS,
  ABOUT_PAIR_ROOM,
} from '@/constants/coduoDocs';
import { CREATE_PAIR_ROOM_STEPS, FREE_START_STEPS, MISSION_START_STEPS } from '@/constants/coduoDocs/howToStart';

import * as S from './CoduoDocs.styles';

const CoduoDocs = () => {
  useScrollToTop();
  const { activeSection } = useHashScroll();

  return (
    <>
      <FloatingSidebar>
        <ContentBox activeSection={activeSection} title="페어 프로그래밍에 대해" contents={ABOUT_PAIR_PROGRAMMING} />
        <ContentBox activeSection={activeSection} title="미션과 함께 시작하기" contents={START_WITH_MISSION} />
        <ContentBox activeSection={activeSection} title="자유롭게 시작하기" contents={START_FREE} />
      </FloatingSidebar>

      <S.Layout>
        <S.Container>
          <S.Title>코딩해듀오 가이드북</S.Title>
          <S.Content>
            코딩해듀오 가이드북에 오신 것을 환영합니다! 코딩해듀오는 페어 프로그래밍을 처음 접하는 사용자가 페어
            프로그래밍을 시작하기 위해 필요한 모든 것을 제공하는 서비스입니다.
          </S.Content>
        </S.Container>

        {PAIR_PROGRAMMING_CONCEPT.map((data, index) => {
          return (
            <S.Container aria-labelledby={data.id} key={index}>
              {data.subtitle && <S.Subtitle id={data.id}>{data.subtitle}</S.Subtitle>}
              {data.quote && <Quote {...data.quote}></Quote>}
              {data.content && <S.Content>{data.content}</S.Content>}
              {data.code && <SourceCode code={data.code} />}
            </S.Container>
          );
        })}

        <S.Container>
          <S.Subtitle id="pair-programming-caution">페어 프로그래밍 시 유의할 점</S.Subtitle>
          <S.Content>페어 프로그래밍을 효과적으로 수행하려면 다음과 같은 부분들을 유의해야 합니다.</S.Content>
          {NOTIONS.map((data, index) => {
            return (
              <S.Content key={index}>
                {data.strong && <S.Strong>{data.strong}</S.Strong>}
                {data.info && <p>{data.info}</p>}
              </S.Content>
            );
          })}
        </S.Container>

        <S.Container>
          <S.Subtitle id="what-is-pair-room">페어룸이란?</S.Subtitle>
          <S.Content>코딩해듀오에서는 페어 프로그래밍을 위해 페어룸이라는 개념을 사용합니다.</S.Content>
          {ABOUT_PAIR_ROOM.map((data, index) => {
            return (
              <S.Content key={index}>
                {data.strong && <S.Strong>{data.strong}</S.Strong>}
                {data.info && <p>{data.info}</p>}
              </S.Content>
            );
          })}
        </S.Container>
      </S.Layout>

      <S.Layout>
        <S.Container id="coduo-start">
          <S.Title>코딩해듀오 시작하기</S.Title>
          <S.Content>이 파트에서는 코딩해듀오를 어떻게 시작할 수 있는지 소개합니다.</S.Content>
          <Steps steps={CREATE_PAIR_ROOM_STEPS} />
        </S.Container>
      </S.Layout>

      <S.Layout>
        <S.Container>
          <S.Subtitle id="start-mission">미션과 함께 시작하기</S.Subtitle>
          <S.Content>
            코딩해듀오는 원활한 페어 프로그래밍 진행을 위해 연습 미션을 제공하고 있습니다.
            <Quote
              text="미션 레포지토리에서 미션을 미리 확인해 보세요."
              linkText="미션 레포지토리로 이동"
              href="https://github.com/coduo-missions"
            />
          </S.Content>
          <Steps steps={MISSION_START_STEPS} />
        </S.Container>

        <S.Container>
          <S.Subtitle id="start-free">자유롭게 시작하기</S.Subtitle>
          <Steps steps={FREE_START_STEPS} />
        </S.Container>
      </S.Layout>
    </>
  );
};

export default CoduoDocs;
