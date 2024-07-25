import { useState } from 'react';
import { useParams } from 'react-router-dom';

import MemoCard from '@/components/PairRoom/MemoCard/MemoCard';
import OnboardingModal from '@/components/PairRoom/OnboardingModal/OnboardingModal';
import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';

import useModal from '@/hooks/useModal';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const { accessCode } = useParams();

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const handleSwap = () => {
    setDriver(navigator);
    setNavigator(driver);
  };

  const { isModalOpen, closeModal } = useModal(true);

  return (
    <>
      <S.Layout>
        <PairListCard />
        <S.Container>
          <PairRoleCard driver={driver} navigator={navigator} onSwap={handleSwap} />
          <TimerCard />
        </S.Container>
        <S.Container>
          <ReferenceCard />
          <MemoCard />
        </S.Container>
      </S.Layout>
      <OnboardingModal accessCode={accessCode || ''} isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default PairRoom;
