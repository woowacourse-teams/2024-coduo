import DocsImage from '@/components/CoduoDocs/DocsImage/DocsImage';
import ContentBox from '@/components/CoduoDocs/FloatingSidebar/ContentBox';
import FloatingSidebar from '@/components/CoduoDocs/FloatingSidebar/FloatingSIdebar';
import QuoteLink from '@/components/CoduoDocs/QuoteLink/QuoteLink';

import useHashScroll from '@/hooks/common/useHashScroll';

import { ABOUT_PAIR_PROGRAMMING, START_CONTENT } from '@/constants/coduoDocs';

import * as S from './Docs.styles';

const Docs = () => {
  useHashScroll();

  return (
    <>
      <FloatingSidebar>
        <ContentBox title="시작하기" contents={START_CONTENT} />
        <ContentBox title="페어 프로그래밍에 대해" contents={ABOUT_PAIR_PROGRAMMING} />
      </FloatingSidebar>

      <S.Layout>
        <S.ParagraphContainer>
          <S.Title>코딩해듀오 시작하기</S.Title>
          <S.Contents>
            코딩해듀오 문서에 오신 것을 환영합니다! 코딩해듀오는 페어 프로그래밍을 처음 접하는 초보자가 페어
            프로그래밍을 시작하기 위해 필요한 모든 것을 제공하는 서비스입니다. 여기에서는 코딩해듀오를 어떻게 시작할 수
            있는지 소개합니다.
          </S.Contents>
          <S.Sentence>
            <S.Contents>코딩해듀오는 원활한 페어 프로그래밍 진행을 위해 연습 미션을 제공하고 있습니다.</S.Contents>
            <QuoteLink
              to="https://velog.io/@imnotmoon/React-Suspense-ErrorBoundary-%EC%A7%81%EC%A0%91-%EB%A7%8C%EB%93%A4%EA%B8%B0"
              linkText="여기부터 읽기"
              text="미션 없이 자유롭게 시작하려면?"
            ></QuoteLink>
          </S.Sentence>
        </S.ParagraphContainer>

        <S.ImageContainer id={START_CONTENT[0].id}>
          <S.ParagraphContainer>
            <S.SubTitle>미션과 함께 시작하기</S.SubTitle>
            <QuoteLink
              to="https://velog.io/@imnotmoon/React-Suspense-ErrorBoundary-%EC%A7%81%EC%A0%91-%EB%A7%8C%EB%93%A4%EA%B8%B0"
              linkText="미션 리포지토리로 이동"
              text="미션 리포지토리에서 미션을 미리 확인해 보세요."
            ></QuoteLink>
          </S.ParagraphContainer>
          <DocsImage
            information="1. 방 만들기 버튼을 누르면 페어 프로그래밍을 진행할 방이 생성됩니다."
            src="https://i.pravatar.cc"
          />
        </S.ImageContainer>

        <S.ImageContainer id={START_CONTENT[1].id}>
          <S.ParagraphContainer>
            <S.SubTitle>이름 입력하기</S.SubTitle>
            <QuoteLink
              to="https://velog.io/@imnotmoon/React-Suspense-ErrorBoundary-%EC%A7%81%EC%A0%91-%EB%A7%8C%EB%93%A4%EA%B8%B0"
              linkText="미션 리포지토리로 이동"
              text="미션 리포지토리에서 미션을 미리 확인해 보세요."
            ></QuoteLink>
          </S.ParagraphContainer>
          <DocsImage
            information="2. 방 만들기 버튼을 누르면 페어 프로그래밍을 진행할 방이 생성됩니다."
            src="https://i.pravatar.cc"
          />
        </S.ImageContainer>
      </S.Layout>
    </>
  );
};

export default Docs;
