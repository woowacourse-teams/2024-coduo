import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '@/pages/Loading/Loading';

import GuideModal from '@/components/PairRoom/GuideModal/GuideModal';
import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';
import TodoListCard from '@/components/PairRoom/TodoListCard/TodoListCard';

import useSocketStore from '@/stores/socketStore';

import useModal from '@/hooks/_common/useModal';
import usePairRoom from '@/hooks/PairRoom/usePairRoom';
import usePairRoomStatusSocket from '@/hooks/PairRoom/usePairRoomStatusSocket';

import usePairRoomMutation from '@/queries/PairRoom/usePairRoomMutation';
import usePairRoomQuery from '@/queries/PairRoom/usePairRoomQuery';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const { accessCode } = useParams();

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [isCardOpen, setIsCardOpen] = useState(false);

  const {
    driver: latestDriver,
    navigator: latestNavigator,
    status: defaultStatus,
    missionUrl,
    duration: defaultTime,
    remainingTime: defaultTimeLeft,
    isFetching,
    todos,
    references,
    categories,
  } = usePairRoomQuery(accessCode || '');

  // 웹소켓 연결
  usePairRoom();
  const { isConnected } = useSocketStore();

  // 페어룸 상태 웹소켓
  usePairRoomStatusSocket(defaultStatus);

  const { updatePairRoleMutation } = usePairRoomMutation();

  const { isModalOpen, closeModal } = useModal(true);

  useEffect(() => {
    setDriver(latestDriver);
    setNavigator(latestNavigator);
  }, [latestDriver, latestNavigator]);

  if (isFetching || !isConnected) {
    return <Loading />;
  }

  return (
    <S.Layout>
      <PairListCard driver={driver} navigator={navigator} missionUrl={missionUrl} accessCode={accessCode || ''} />
      <S.Container>
        <PairRoleCard driver={driver} navigator={navigator} />
        <TimerCard
          defaultTime={defaultTime}
          defaultTimeLeft={defaultTimeLeft}
          onTimerStop={() => updatePairRoleMutation({ accessCode: accessCode || '' })}
        />
      </S.Container>
      <S.Container>
        <TodoListCard isOpen={!isCardOpen} toggleIsOpen={() => setIsCardOpen(false)} defaultTodos={todos} />
        <ReferenceCard
          isOpen={isCardOpen}
          toggleIsOpen={() => setIsCardOpen(true)}
          defaultReferences={references}
          defaultCategories={categories}
        />
      </S.Container>
      <GuideModal isOpen={isModalOpen} close={closeModal} accessCode={accessCode || ''} />
    </S.Layout>
  );
};

export default PairRoom;
