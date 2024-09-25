import { Link } from 'react-router-dom';

import { LuHome } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';

import * as S from './PageNotFound.styles';

const PageNotFound = () => {
  return (
    <S.Layout>
      <S.Title>🚨 404 🚨</S.Title>
      <S.Description>
        존재하지 않는 페이지이거나 잘못된 접근입니다. <br />
        주소를 다시 확인해주세요. 😥
      </S.Description>
      <Link to="/">
        <Button rounded={true} size="lg" aria-label="홈으로 이동">
          <LuHome size="2rem" />
        </Button>
      </Link>
    </S.Layout>
  );
};

export default PageNotFound;
