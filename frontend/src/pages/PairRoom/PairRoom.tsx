import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';
import TodoListCard from '@/components/PairRoom/TodoListCard/TodoListCard';

import { getPairRoom } from '@/apis/pairRoom';

import useAddPairRoomHistory from '@/queries/Main/useAddPairRoomHistory';
import useGetPairRoomHistory from '@/queries/Main/useGetPairRoomHistory';
import useUpdateRemainingTime from '@/queries/PairRoomOnboarding/useUpdateRemainingTime';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const { accessCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPairRoomExists = async () => {
      try {
        await getPairRoom(accessCode || '');
      } catch (error) {
        navigate('/404');
      }
    };

    checkPairRoomExists();
  }, [accessCode]);

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const {
    driver: latestDriver,
    navigator: latestNavigator,
    timerDuration,
    timerRemainingTime,
  } = useGetPairRoomHistory(accessCode || '');

  const { handleAddPairRoomHistory } = useAddPairRoomHistory(accessCode || '');
  const { handleUpdateRemainingTime } = useUpdateRemainingTime(accessCode || '');

  useEffect(() => {
    setDriver(latestDriver);
    setNavigator(latestNavigator);
  }, [latestDriver, latestNavigator]);

  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleSwap = () => {
    handleAddPairRoomHistory(navigator, driver, timerDuration, timerDuration);

    setDriver(navigator);
    setNavigator(driver);
  };

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
        <TodoListCard isOpen={!isCardOpen} toggleIsOpen={() => setIsCardOpen(false)} />
        <ReferenceCard accessCode={accessCode || ''} isOpen={isCardOpen} toggleIsOpen={() => setIsCardOpen(true)} />
      </S.Container>
    </S.Layout>
  );
};

export default PairRoom;
