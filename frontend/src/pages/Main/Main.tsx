import * as S from '@/pages/Main/Main.styles';

import Button from '@/components/_common/Button/Button';
import { ScrollAnimationContainer } from '@/components/_common/ScrollAnimationContainer/ScrollAnimationContainer';
import PairRoomCreateModal from '@/components/Main/PairRoomCreateModal/PairRoomCreateModal';
import PairRoomEntryModal from '@/components/Main/PairRoomEntryModal/PairRoomEntryModal';
import WaveBackground from '@/components/Main/WaveBackground/WaveBackground';

import usePreventBackNavigation from '@/hooks/_common/customEvent/usePreventBackNavigation';
import useModal from '@/hooks/_common/useModal';

import { theme } from '@/styles/theme';

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
    <>
      <WaveBackground />
      <S.Layout>
        <ScrollAnimationContainer animationDirection="right">
          <S.TextContainer>
            <S.TitleContainer role="presentation">
              <S.SubTitle aria-label="협업과 성장을 위한 페어 프로그래밍">
                <p aria-hidden={true}>
                  <span>협업</span>과 <span>성장</span>을 위한
                  <br />
                  <span>페어 프로그래밍-</span>
                </p>
              </S.SubTitle>
              <S.Title aria-label="코딩해듀오">
                <p aria-hidden={true}>
                  코딩해<span>듀오</span>
                </p>
              </S.Title>
            </S.TitleContainer>
            <S.Info role="presentation">
              코딩해듀오는 페어 프로그래밍을 통해 더 나은 결과를 만들어내는 것을 목표로 합니다.
              <br />
              직관적인 인터페이스와 실시간 협업 도구로, 누구나 쉽게 사용할 수 있습니다.
            </S.Info>
          </S.TextContainer>
        </ScrollAnimationContainer>
        <S.ButtonContainer>
          <ScrollAnimationContainer animationDirection="left" animationDelay={0.2}>
            <Button
              size="xl"
              borderRadius="6rem"
              fontSize={theme.fontSize.h6}
              rounded={true}
              onClick={openPairRoomCreateModal}
            >
              페어룸 만들기
            </Button>
          </ScrollAnimationContainer>
          <ScrollAnimationContainer animationDirection="left" animationDelay={0.4}>
            <Button
              size="xl"
              borderRadius="6rem"
              fontSize={theme.fontSize.h6}
              filled={false}
              rounded={true}
              onClick={openPairRoomEntryModal}
            >
              페어룸 들어가기
            </Button>
          </ScrollAnimationContainer>
        </S.ButtonContainer>
        <PairRoomCreateModal isOpen={isPairRoomCreateModalOpen} closeModal={closePairRoomCreateModal} />
        <PairRoomEntryModal isOpen={isPairRoomEntryModalOpen} closeModal={closePairRoomEntryModal} />
      </S.Layout>
    </>
  );
};

export default Main;
