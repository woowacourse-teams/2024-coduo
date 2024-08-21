import * as S from '@/pages/Main/Main.styles';

import Button from '@/components/common/Button/Button';
import PairRoomCreateModal from '@/components/Main/PairRoomCreateModal/PairRoomCreateModal';
import PairRoomEntryModal from '@/components/Main/PairRoomEntryModal/PairRoomEntryModal';

import useModal from '@/hooks/common/useModal';
import usePreventBackNavigation from '@/hooks/common/usePreventBackNavigation';

const Main = () => {
  usePreventBackNavigation();

  const {
    isModalOpen: isPairRoomCreateModalOpen,
    openModal: openPairRoomCreateModal,
    closeModal: closePairRoomCreateModal,
  } = useModal();

  const {
    isModalOpen: isPairRoomEntryModalOpen,
    openModal: openPairRoomEntryModal,
    closeModal: closePairRoomEntryModal,
  } = useModal();

  return (
    <S.Layout>
      <S.TextContainer>
        <S.TitleContainer>
          <S.SubTitle>
            <span>협업</span>과 <span>성장</span>을 위한
            <br />
            <span>페어프로그래밍-</span>
          </S.SubTitle>
          <S.Title>
            코딩해<span>듀오</span>
          </S.Title>
        </S.TitleContainer>
        <S.Info>
          코딩해듀오는 페어프로그래밍을 통해 더 나은 결과를 만들어내는 것을 목표로 합니다.
          <br />
          직관적인 인터페이스와 실시간 협업 도구로, 누구나 쉽게 사용할 수 있습니다.
        </S.Info>
      </S.TextContainer>
      <S.ButtonContainer>
        <Button size="xl" rounded={true} onClick={openPairRoomCreateModal}>
          방 만들기
        </Button>
        <Button size="xl" filled={false} rounded={true} onClick={openPairRoomEntryModal}>
          방 들어가기
        </Button>
      </S.ButtonContainer>
      <PairRoomCreateModal isOpen={isPairRoomCreateModalOpen} closeModal={closePairRoomCreateModal} />
      <PairRoomEntryModal isOpen={isPairRoomEntryModalOpen} closeModal={closePairRoomEntryModal} />
    </S.Layout>
  );
};

export default Main;
