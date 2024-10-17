import { useState } from 'react';

import DeleteButton from '@/components/PairRoom/PairListCard/DeleteButton/DeleteButton';
import Header from '@/components/PairRoom/PairListCard/Header/Header';
import PairListSection from '@/components/PairRoom/PairListCard/PairListSection/PairListSection';
import RepositorySection from '@/components/PairRoom/PairListCard/RepositorySection/RepositorySection';
import RoomCodeSection from '@/components/PairRoom/PairListCard/RoomCodeSection/RoomCodeSection';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import useCompletePairRoom from '@/queries/PairRoom/useCompletePairRoom';

import * as S from './PairListCard.styles';

interface PairListCardProps {
  driver: string;
  navigator: string;
  missionUrl: string;
  roomCode: string;
}

const PairListCard = ({ driver, navigator, missionUrl, roomCode }: PairListCardProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { handleCompletePairRoom } = useCompletePairRoom();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <S.Layout $isOpen={isOpen}>
      <PairRoomCard>
        <Header isOpen={isOpen} toggleOpen={toggleOpen} />
        <S.Sidebar>
          <RoomCodeSection isOpen={isOpen} roomCode={roomCode} />
          {missionUrl !== '' && <RepositorySection isOpen={isOpen} missionUrl={missionUrl} />}
          <PairListSection isOpen={isOpen} driver={driver} navigator={navigator} />
          <DeleteButton isOpen={isOpen} onClick={() => handleCompletePairRoom(roomCode)} />
        </S.Sidebar>
      </PairRoomCard>
    </S.Layout>
  );
};

export default PairListCard;
