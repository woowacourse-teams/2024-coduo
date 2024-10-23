import { IoIosArrowForward } from 'react-icons/io';

import MyPageContent from '@/pages/MyPage/MyPageContent/MyPageContent';

import ConfirmModal from '@/components/MyPage/ConfirmModal/ConfirmModal';

import useUserStore from '@/stores/userStore';

import useModal from '@/hooks/common/useModal';

import useDeleteMember from '@/queries/MyPage/useDeleteMember';

import * as S from './MyPage.styles';

const MyPage = () => {
  const { username } = useUserStore();

  const { isModalOpen, openModal, closeModal } = useModal();

  const { handleDeleteMember } = useDeleteMember();

  return (
    <S.Layout>
      <S.Container>
        <S.TitleContainer>
          <S.Title>마이 페이지</S.Title>
          <S.SubTitle>
            <span>{username}</span> 님의 마이 페이지에 오신 걸 환영합니다!
          </S.SubTitle>
          <S.BottomLine />
        </S.TitleContainer>
        <S.ListWrapper>
          <MyPageContent />
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
