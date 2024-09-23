import { IoIosArrowForward } from 'react-icons/io';

import PairRoomButton from '@/components/MyPage/PairRoomButton/PairRoomButton';

import * as S from './MyPage.styles';

const MyPage = () => {
  return (
    <S.Layout>
      <S.Container>
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
              <PairRoomButton driver="레모네" navigator="파슬리" status="IN_PROGRESS" />
              <PairRoomButton driver="레모네" navigator="파슬리" status="COMPLETED" />
            </S.List>
          </div>
        </S.ListWrapper>
        <S.LeaveButton>
          회원 탈퇴하기
          <IoIosArrowForward size="1.5rem" />
        </S.LeaveButton>
      </S.Container>
    </S.Layout>
  );
};

export default MyPage;
