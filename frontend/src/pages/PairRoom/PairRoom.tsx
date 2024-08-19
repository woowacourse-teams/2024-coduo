import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';
import TodoListCard from '@/components/PairRoom/TodoListCard/TodoListCard';

import useGetPairRoomInformation from '@/queries/PairRoomOnboarding/useGetPairRoomInformation';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  const { state } = useLocation();
  const { accessCode } = useParams();

  const [driver, setDriver] = useState(state.driver || '');
  const [navigator, setNavigator] = useState(state.navigator || '');

  const [isCardOpen, setIsCardOpen] = useState(false);

  const toggleIsCardOpen = () => setIsCardOpen((prev) => !prev);

  const handleSwap = () => {
    setDriver(navigator);
    setNavigator(driver);
  };

  const { timeDuration } = useGetPairRoomInformation(accessCode || '');

  return (
    <S.Layout>
      <PairListCard driver={driver} navigator={navigator} roomCode={accessCode || ''} onRoomDelete={() => {}} />
      <S.Container>
        <PairRoleCard driver={driver} navigator={navigator} />
        <TimerCard defaultTime={timeDuration} onTimerStop={handleSwap} />
      </S.Container>
      <S.Container>
        <TodoListCard isOpen={!isCardOpen} toggleIsOpen={toggleIsCardOpen} />
        <ReferenceCard accessCode={accessCode || ''} isOpen={isCardOpen} toggleIsOpen={toggleIsCardOpen} />
      </S.Container>
    </S.Layout>
  );
};

export default PairRoom;
