import { IoIosArrowForward } from 'react-icons/io';

import * as S from './MyPage.styles';

const MyPage = () => {
  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>마이 페이지</S.Title>
        <S.SubTitle>
          <span>코듀오</span> 님의 마이 페이지에 오신 걸 환영합니다!
        </S.SubTitle>
      </S.TitleContainer>
      <S.ListWrapper>
        <h2>나의 페어룸 목록</h2>
        <div>
          <S.AllText>총 0개</S.AllText>
          <S.List>
            <S.PairRoomButton>
              <S.PairRoleTextContainer>
                <S.PairRoleText>
                  <span>드라이버</span>레모네
                </S.PairRoleText>
                <S.PairRoleText>
                  <span>내비게이터</span>파슬리
                </S.PairRoleText>
              </S.PairRoleTextContainer>
              <S.StatusText>진행 중</S.StatusText>
              <S.ConnectText>
                접속
                <IoIosArrowForward size="1.8rem" />
              </S.ConnectText>
            </S.PairRoomButton>
          </S.List>
        </div>
      </S.ListWrapper>
      <S.LeaveButton>
        회원 탈퇴하기
        <IoIosArrowForward size="1.5rem" />
      </S.LeaveButton>
    </S.Layout>
  );
};

export default MyPage;
