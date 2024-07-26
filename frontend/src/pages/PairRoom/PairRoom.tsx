import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import MemoCard from '@/components/PairRoom/MemoCard/MemoCard';
import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';

import useTimer from '@/hooks/PairRoom/useTimer';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const { state } = useLocation();

  const [driver, setDriver] = useState(state.driver || '');
  const [navigator, setNavigator] = useState(state.navigator || '');

  const time = Number(state.timer || '') * 60 * 1000;

  const handleSwap = () => {
    setDriver(navigator);
    setNavigator(driver);
  };

  const { timeLeft, isActive, handleStart, handlePause, handleStop } = useTimer(time, handleSwap);

  return (
    <S.Layout>
      <PairListCard />
      <S.Container>
        <PairRoleCard driver={driver} navigator={navigator} onSwap={handleSwap} onTimerReset={handleStop} />
        <TimerCard
          timeLeft={timeLeft}
          isActive={isActive}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
        />
      </S.Container>
      <S.Container>
        <ReferenceCard />
        <MemoCard />
      </S.Container>
    </S.Layout>
  );
};

export default PairRoom;
