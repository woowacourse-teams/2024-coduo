import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';

import useTimer from '@/hooks/PairRoom/useTimer';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const { state } = useLocation();
  const { accessCode } = useParams();

  const [driver, setDriver] = useState(state.driver || '');
  const [navigator, setNavigator] = useState(state.navigator || '');

  const time = Number(state.timer || '') * 60 * 1000;

  const handleSwap = () => {
    setDriver(navigator);
    setNavigator(driver);
  };

  const { timeLeft, isActive, handleStart, handlePause } = useTimer(time, handleSwap);

  return (
    <S.Layout>
      <PairListCard driver={driver} navigator={navigator} roomCode={accessCode || ''} onRoomDelete={() => {}} />
      <S.Container>
        <PairRoleCard driver={driver} navigator={navigator} />
        <TimerCard
          defaultTime={time}
          timeLeft={timeLeft}
          isActive={isActive}
          onStart={handleStart}
          onPause={handlePause}
        />
      </S.Container>
      <S.Container>
        <ReferenceCard accessCode={accessCode || ''} />
      </S.Container>
    </S.Layout>
  );
};

export default PairRoom;
