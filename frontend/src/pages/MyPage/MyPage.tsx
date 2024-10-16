import { IoIosArrowForward } from 'react-icons/io';

import Spinner from '@/components/common/Spinner/Spinner';
import ConfirmModal from '@/components/MyPage/ConfirmModal/ConfirmModal';
import PairRoomButton from '@/components/MyPage/PairRoomButton/PairRoomButton';

import useUserStore from '@/stores/userStore';

import useModal from '@/hooks/common/useModal';

import useDeleteMember from '@/queries/MyPage/useDeleteMember';
import useMyPairRooms from '@/queries/MyPage/useMyPairRooms';

import * as S from './MyPage.styles';

const MyPage = () => {
  const { username } = useUserStore();

  const { isModalOpen, openModal, closeModal } = useModal();

  const { data: pairRooms, isFetching } = useMyPairRooms();
  const { handleDeleteMember } = useDeleteMember();

  return (
    <S.Layout>
      <S.Container>
        <S.TitleContainer>
          <S.Title>마이 페이지</S.Title>
          <S.SubTitle>
            <span>{username}</span> 님의 마이 페이지에 오신 걸 환영합니다!
          </S.SubTitle>
        </S.TitleContainer>
        <S.ListWrapper>
          <h2>나의 페어룸 목록</h2>
          <div>
            <S.AllText>총 {pairRooms && pairRooms.length}개</S.AllText>
            <S.List>
              {isFetching && <Spinner />}
              {!isFetching && pairRooms?.length === 0 ? (
                <S.EmptyText>생성한 페어룸이 없습니다.</S.EmptyText>
              ) : (
                pairRooms &&
                pairRooms.map((pairRoom) => (
                  <PairRoomButton
                    key={pairRoom.id}
                    driver={pairRoom.driver}
                    navigator={pairRoom.navigator}
                    status={pairRoom.status}
                    accessCode={pairRoom.accessCode}
                  />
                ))
              )}
            </S.List>
          </div>
        </S.ListWrapper>
        <S.LeaveButton onClick={openModal}>
          회원 탈퇴하기
          <IoIosArrowForward size="1.5rem" />
        </S.LeaveButton>
      </S.Container>
      <ConfirmModal isOpen={isModalOpen} close={closeModal} onConfirm={handleDeleteMember} />
    </S.Layout>
  );
};

export default MyPage;
