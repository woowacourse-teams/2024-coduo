import Button from '@/components/common/Button/Button';

import * as S from './MyPage.styles';

const MyPage = () => {
  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>마이 페이지</S.Title>
        <S.SubTitle>코듀오 님의 마이 페이지에 오신 걸 환영합니다!</S.SubTitle>
      </S.TitleContainer>
      <S.ButtonContainer>
        <Button css={S.buttonStyles}>
          <h2>페어룸 리스트 확인하기</h2>
        </Button>
        <Button css={S.buttonStyles}>
          <h2>회원 탈퇴하기</h2>
        </Button>
      </S.ButtonContainer>
    </S.Layout>
  );
};

export default MyPage;
