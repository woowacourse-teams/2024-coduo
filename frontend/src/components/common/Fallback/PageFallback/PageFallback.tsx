import Spinner from '@/components/common/Spinner/Spinner';

import * as S from './PageFallback.styles';

const PageFallback = () => {
  return (
    <S.Layout>
      <S.Title>페이지를 불러오는 중입니다. 잠시만 기다려주세요 ☺️</S.Title>
      <Spinner size="md" />
    </S.Layout>
  );
};

export default PageFallback;
