import ContentBox from '@/components/CoduoDocs/ContentBox/ContentBox';
import FloatingSidebar from '@/components/CoduoDocs/FloatingSidebar/FloatingSidebar';
import Quote from '@/components/CoduoDocs/Quote/Quote';
import SourceCode from '@/components/CoduoDocs/SourceCode/SourceCode';
import Steps from '@/components/CoduoDocs/Steps/Steps';

import useHashScroll from '@/hooks/CoduoDocs/useHashScroll';

import {
  PAIR_PROGRAMMING_CONCEPT,
  HOW_TO_START,
  START_WITH_MISSION,
  START_FREE,
  ABOUT_PAIR_PROGRAMMING,
  NOTIONS,
  ABOUT_PAIR_ROOM,
} from '@/constants/coduoDocs';

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
            <S.Container aria-labelledby={data.id} key={index}>
              {data.title && <S.Title id={data.id}>{data.title}</S.Title>}
              {data.subtitle && <S.Subtitle id={data.id}>{data.subtitle}</S.Subtitle>}
              {data.content && <S.Content>{data.content}</S.Content>}
              {data.quote && <Quote {...data.quote}></Quote>}
              {data.steps && <Steps steps={data.steps} />}
            </S.Container>
          );
        })}

        {PAIR_PROGRAMMING_CONCEPT.map((data, index) => {
          return (
            <S.Container aria-labelledby={data.id} key={index}>
              {data.title && <S.Title id={data.id}>{data.title}</S.Title>}
              {data.subtitle && <S.Subtitle id={data.id}>{data.subtitle}</S.Subtitle>}
              {data.quote && <Quote {...data.quote}></Quote>}
              {data.content && <S.Content>{data.content}</S.Content>}
              {data.code && <SourceCode code={data.code} />}
            </S.Container>
          );
        })}
        <S.Container>
          {NOTIONS.map((data, index) => {
            return (
              <S.Content key={index}>
                {data.quote && <Quote text={data.quote}></Quote>}
                {data.strong && <S.Strong>{data.strong}</S.Strong>}
                {data.info && <p>{data.info}</p>}
              </S.Content>
            );
          })}
        </S.Container>
        <S.Container>
          {ABOUT_PAIR_ROOM.map((data, index) => {
            return (
              <S.Content key={index}>
                {data.subtitle && <S.Subtitle id={data.id}>{data.subtitle}</S.Subtitle>}
                {data.quote && <Quote text={data.quote}></Quote>}
                {data.strong && <S.Strong>{data.strong}</S.Strong>}
                {data.info && <p>{data.info}</p>}
              </S.Content>
            );
          })}
        </S.Container>
      </S.Layout>
    </>
  );
};

export default CoduoDocs;
