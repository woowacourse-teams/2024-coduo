import { IoIosArrowForward } from 'react-icons/io';

import Spinner from '@/components/common/Spinner/Spinner';
import PairRoomButton from '@/components/MyPage/PairRoomButton/PairRoomButton';

import useMyPairRooms from '@/queries/MyPage/useMyPairRooms';

import * as S from './MyPage.styles';

const MyPage = () => {
  const { data: pairRooms, isFetching } = useMyPairRooms();

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
              {isFetching ? (
                <Spinner />
              ) : (
                pairRooms &&
                pairRooms.map((pairRoom) => (
                  <PairRoomButton
                    key={pairRoom.id}
                    driver={pairRoom.driver}
                    navigator={pairRoom.navigator}
                    status={pairRoom.status}
                  />
                ))
              )}
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
