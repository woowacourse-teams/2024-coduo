import ContentBox from '@/components/CoduoDocs/ContentBox/ContentBox';
import DocsImage from '@/components/CoduoDocs/DocsImage/DocsImage';
import FloatingSidebar from '@/components/CoduoDocs/FloatingSidebar/FloatingSidebar';
import Quote from '@/components/CoduoDocs/Quote/Quote';

import useHashScroll from '@/hooks/CoduoDocs/useHashScroll';

import { HOW_TO_START } from '@/constants/coduoDocs/howToStart';
import { START_WITH_MISSION, START_FREE, ABOUT_PAIR_PROGRAMMING } from '@/constants/coduoDocs/sidebar';

import * as S from './CoduoDocs.styles';

const CoduoDocs = () => {
  const { activeSection } = useHashScroll();

  return (
    <>
      <FloatingSidebar>
        <ContentBox activeSection={activeSection} title="미션과 함께 시작하기" contents={START_WITH_MISSION} />
        <ContentBox activeSection={activeSection} title="자유롭게 시작하기" contents={START_FREE} />
        <ContentBox activeSection={activeSection} title="페어 프로그래밍에 대해" contents={ABOUT_PAIR_PROGRAMMING} />
      </FloatingSidebar>

      <S.Layout>
        {HOW_TO_START.map((data, index) => {
          return (
            <S.ParagraphContainer aria-labelledby={data.id} key={index}>
              {data.title && <S.Title id={data.id}>{data.title}</S.Title>}
              {data.subtitle && <S.Subtitle id={data.id}>{data.subtitle}</S.Subtitle>}
              {data.content && <S.Content>{data.content}</S.Content>}
              {data.quote && <Quote {...data.quote}></Quote>}
              {data.images && <DocsImage images={data.images} />}
            </S.ParagraphContainer>
          );
        })}

        {/* <S.Sentence>
            <S.Content>코딩해듀오는 원활한 페어 프로그래밍 진행을 위해 연습 미션을 제공하고 있습니다.</S.Content>
            <Quote href="#start-free" linkText="여기부터 읽기" text="미션 없이 자유롭게 시작하려면?" />
          </S.Sentence> */}
        {/* </S.ParagraphContainer> */}
      </S.Layout>
    </>
  );
};

export default CoduoDocs;
