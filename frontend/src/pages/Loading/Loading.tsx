import Spinner from '@/components/_common/Spinner/Spinner';

import * as S from './Loading.styles';

const Loading = () => {
  return (
    <S.Layout>
      <S.Title>페이지를 불러오는 중입니다. 잠시만 기다려 주세요 ☺️</S.Title>
      <Spinner size="md" />
    </S.Layout>
  );
};

export default Loading;
