import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '@/pages/Loading/Loading';

import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';
import TodoListCard from '@/components/PairRoom/TodoListCard/TodoListCard';

import { getPairRoomExists } from '@/apis/pairRoom';

import useGetPairRoom from '@/queries/PairRoom/useGetPairRoom';
import useUpdatePairRoom from '@/queries/PairRoom/useUpdatePairRoom';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const navigate = useNavigate();
  const { accessCode } = useParams();

  useEffect(() => {
    const checkPairRoomExists = async () => {
      if (!accessCode) navigate('/error');

      const { exists } = await getPairRoomExists(accessCode || '');

      if (!exists) navigate('/error');
    };

    checkPairRoomExists();
  }, [accessCode]);

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const {
    driver: latestDriver,
    navigator: latestNavigator,
    duration,
    remainingTime,
    isFetching,
  } = useGetPairRoom(accessCode || '');
  const { handleUpdatePairRole } = useUpdatePairRoom(accessCode || '');

  useEffect(() => {
    setDriver(latestDriver);
    setNavigator(latestNavigator);
  }, [latestDriver, latestNavigator]);

  const [isCardOpen, setIsCardOpen] = useState(false);

  if (isFetching) {
    return <Loading />;
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
          onTimerStop={handleUpdatePairRole}
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
