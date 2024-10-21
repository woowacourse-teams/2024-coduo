import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '@/pages/Loading/Loading';

import GuideModal from '@/components/PairRoom/GuideModal/GuideModal';
import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';
import TodoListCard from '@/components/PairRoom/TodoListCard/TodoListCard';

import useModal from '@/hooks/common/useModal';

import useGetPairRoom from '@/queries/PairRoom/useGetPairRoom';
import useUpdatePairRoom from '@/queries/PairRoom/useUpdatePairRoom';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const { accessCode } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const {
    driver: latestDriver,
    navigator: latestNavigator,
    status,
    missionUrl,
    duration,
    remainingTime,
    isFetching,
  } = useGetPairRoom(accessCode || '');
  const { handleUpdatePairRole } = useUpdatePairRoom(accessCode || '');

  useEffect(() => {
    if (status === 'COMPLETED') {
      navigate(`/room/${accessCode}/completed`, { state: { valid: true }, replace: true });
    }
    setDriver(latestDriver);
    setNavigator(latestNavigator);
  }, [latestDriver, latestNavigator]);

  const [isCardOpen, setIsCardOpen] = useState(false);

  const { isModalOpen, closeModal } = useModal(true);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <S.Layout>
      <PairListCard driver={driver} navigator={navigator} missionUrl={missionUrl} roomCode={accessCode || ''} />
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
      <GuideModal isOpen={isModalOpen} close={closeModal} accessCode={accessCode || ''} />
    </S.Layout>
  );
};

export default PairRoom;
