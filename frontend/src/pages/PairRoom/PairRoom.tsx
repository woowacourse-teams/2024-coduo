import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '@/components/common/Spinner/Spinner';
import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';
import TodoListCard from '@/components/PairRoom/TodoListCard/TodoListCard';

import useGetPairRoom from '@/queries/PairRoom/useGetPairRoom';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const { accessCode } = useParams();

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const {
    driver: latestDriver,
    navigator: latestNavigator,
    duration,
    remainingTime,
    isFetching,
  } = useGetPairRoom(accessCode || '');

  useEffect(() => {
    setDriver(latestDriver);
    setNavigator(latestNavigator);
  }, [latestDriver, latestNavigator]);

  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleSwap = () => {
    setDriver(navigator);
    setNavigator(driver);
  };

  if (isFetching) {
    return (
      <S.Layout>
        <Spinner />
      </S.Layout>
    );
  }

  return (
    <S.Layout>
      <PairListCard driver={driver} navigator={navigator} roomCode={accessCode || ''} onRoomDelete={() => {}} />
      <S.Container>
        <PairRoleCard driver={driver} navigator={navigator} />
        <TimerCard
          accessCode={accessCode || ''}
          defaultTime={duration}
          defaultTimeleft={remainingTime}
          onTimerStop={handleSwap}
        />
      </S.Container>
      <S.Container>
        <TodoListCard isOpen={!isCardOpen} toggleIsOpen={() => setIsCardOpen(false)} />
        <ReferenceCard accessCode={accessCode || ''} isOpen={isCardOpen} toggleIsOpen={() => setIsCardOpen(true)} />
      </S.Container>
    </S.Layout>
  );
};

export default PairRoom;
