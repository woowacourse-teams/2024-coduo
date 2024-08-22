import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '@/components/common/Spinner/Spinner';
import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';
import TodoListCard from '@/components/PairRoom/TodoListCard/TodoListCard';

import useGetPairRoomHistory from '@/queries/Main/useGetPairRoomHistory';
import useUpdateRemainingTime from '@/queries/PairRoomOnboarding/useUpdateRemainingTime';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const { accessCode } = useParams();

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const {
    driver: latestDriver,
    navigator: latestNavigator,
    timerDuration,
    timerRemainingTime,
    isFetching,
  } = useGetPairRoomHistory(accessCode || '');

  console.log(timerRemainingTime);

  const { handleUpdateRemainingTime } = useUpdateRemainingTime(accessCode || '');

  useEffect(() => {
    setDriver(latestDriver);
    setNavigator(latestNavigator);
  }, [latestDriver, latestNavigator]);

  const [isCardOpen, setIsCardOpen] = useState(false);
  const toggleIsCardOpen = () => setIsCardOpen((prev) => !prev);

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
          defaultTime={timerDuration}
          defaultTimeleft={timerRemainingTime}
          onTimerStop={handleSwap}
          onUpdateTimeLeft={handleUpdateRemainingTime}
        />
      </S.Container>
      <S.Container>
        <TodoListCard isOpen={!isCardOpen} toggleIsOpen={toggleIsCardOpen} />
        <ReferenceCard accessCode={accessCode || ''} isOpen={isCardOpen} toggleIsOpen={toggleIsCardOpen} />
      </S.Container>
    </S.Layout>
  );
};

export default PairRoom;
