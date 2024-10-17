import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Loading from '@/pages/Loading/Loading';

import GuideModal from '@/components/PairRoom/GuideModal/GuideModal';
import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';
import TodoListCard from '@/components/PairRoom/TodoListCard/TodoListCard';

import useToastStore from '@/stores/toastStore';

import { getPairRoomExists } from '@/apis/pairRoom';

import useModal from '@/hooks/common/useModal';

import useGetPairRoom from '@/queries/PairRoom/useGetPairRoom';
import useUpdatePairRoom from '@/queries/PairRoom/useUpdatePairRoom';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessCode } = useParams();

  const { addToast } = useToastStore();

  useEffect(() => {
    const checkAccessValid = async () => {
      if (!location.state?.valid) {
        navigate('/main');
        addToast({ status: 'ERROR', message: '유효하지 않은 접근입니다. 올바른 경로로 접근해 주세요.' });
        return;
      }

      if (!accessCode) {
        navigate('/main');
        addToast({ status: 'ERROR', message: '존재하지 않는 페어룸 코드입니다. 다시 확인해 주세요.' });
        return;
      }

      const { exists } = await getPairRoomExists(accessCode);

      if (!exists) {
        navigate('/main');
        addToast({ status: 'ERROR', message: '존재하지 않는 페어룸 코드입니다. 다시 확인해 주세요.' });
        return;
      }
    };

    checkAccessValid();
  }, [accessCode]);

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const {
    driver: latestDriver,
    navigator: latestNavigator,
    missionUrl,
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

  const { isModalOpen, closeModal } = useModal(true);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <S.Layout>
      <PairListCard
        driver={driver}
        navigator={navigator}
        missionUrl={missionUrl}
        roomCode={accessCode || ''}
        onRoomDelete={() => {}}
      />
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
