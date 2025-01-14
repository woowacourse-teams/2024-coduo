import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '@/pages/Loading/Loading';

import GuideModal from '@/components/PairRoom/GuideModal/GuideModal';
import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';
import TodoListCard from '@/components/PairRoom/TodoListCard/TodoListCard';

import useModal from '@/hooks/_common/useModal';
import usePairRoom from '@/hooks/PairRoom/usePairRoom';

import usePairRoomMutation from '@/queries/PairRoom/usePairRoomMutation';
import usePairRoomQuery from '@/queries/PairRoom/usePairRoomQuery';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const navigate = useNavigate();
  const { accessCode } = useParams();

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [isCardOpen, setIsCardOpen] = useState(false);

  const {
    driver: latestDriver,
    navigator: latestNavigator,
    status,
    missionUrl,
    duration,
    remainingTime,
    isFetching,
    todos,
    references,
    categories,
  } = usePairRoomQuery(accessCode || '');

  const { updatePairRoleMutation } = usePairRoomMutation();

  const { isModalOpen, closeModal } = useModal(true);

  useEffect(() => {
    if (status === 'COMPLETED') navigate(`/room/${accessCode}/completed`, { state: { valid: true }, replace: true });
  }, [status]);

  useEffect(() => {
    setDriver(latestDriver);
    setNavigator(latestNavigator);
  }, [latestDriver, latestNavigator]);

  const { socket } = usePairRoom(accessCode || '');

  if (isFetching) {
    return <Loading />;
  }

  return (
    <S.Layout>
      <PairListCard driver={driver} navigator={navigator} missionUrl={missionUrl} accessCode={accessCode || ''} />
      <S.Container>
        <PairRoleCard driver={driver} navigator={navigator} />
        <TimerCard
          socket={socket}
          accessCode={accessCode || ''}
          defaultTime={duration}
          defaultTimeLeft={remainingTime}
          onTimerStop={() => updatePairRoleMutation({ accessCode: accessCode || '' })}
        />
      </S.Container>
      <S.Container>
        <TodoListCard isOpen={!isCardOpen} toggleIsOpen={() => setIsCardOpen(false)} todos={todos} />
        <ReferenceCard
          accessCode={accessCode || ''}
          isOpen={isCardOpen}
          toggleIsOpen={() => setIsCardOpen(true)}
          references={references}
          categories={categories}
        />
      </S.Container>
      <GuideModal isOpen={isModalOpen} close={closeModal} accessCode={accessCode || ''} />
    </S.Layout>
  );
};

export default PairRoom;
