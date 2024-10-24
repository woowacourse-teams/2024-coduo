import { Link } from 'react-router-dom';

import Button from '@/components/common/Button/Button';

import * as S from './Error.styles';

const Error = () => {
  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>404</S.Title>
        <S.SubTitle>페이지를 불러오는 중 문제가 발생했습니다.</S.SubTitle>
      </S.TitleContainer>
      <Link to="/">
        <Button $css={S.buttonStyles} size="lg" aria-label="홈으로 이동">
          홈으로 이동
        </Button>
      </Link>
    </S.Layout>
  );
};

export default Error;
