import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getPairNames } from '@/apis/pairName';

import MemoCard from '@/components/PairRoom/MemoCard/MemoCard';
import OnboardingModal from '@/components/PairRoom/OnboardingModal/OnboardingModal';
import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';

import useModal from '@/hooks/useModal';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const [driver, setDriver] = useState('퍼렁');
  const [navigator, setNavigator] = useState('포롱');

  const handleSwap = () => {
    setDriver(navigator);
    setNavigator(driver);
  };

  const { isModalOpen, closeModal } = useModal(true);

  const { data } = useQuery({ queryKey: ['getPairNames'], queryFn: () => getPairNames });

  console.log(data);

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
      <OnboardingModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default PairRoom;
