import { useState } from 'react';

import DeleteButton from '@/components/PairRoom/PairListCard/DeleteButton/DeleteButton';
import Header from '@/components/PairRoom/PairListCard/Header/Header';
import PairListSection from '@/components/PairRoom/PairListCard/PairListSection/PairListSection';
import RoomCodeSection from '@/components/PairRoom/PairListCard/RoomCodeSection/RoomCodeSection';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import * as S from './PairListCard.styles';

interface PairListCardProps {
  driver: string;
  navigator: string;
  roomCode: string;
  onRoomDelete: () => void;
}

const PairListCard = ({ driver, navigator, roomCode, onRoomDelete }: PairListCardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <S.Layout $isOpen={isOpen}>
      <PairRoomCard>
        <Header isOpen={isOpen} toggleOpen={toggleOpen} />
        <S.Sidebar>
          <RoomCodeSection isOpen={isOpen} roomCode={roomCode} />
          <PairListSection isOpen={isOpen} driver={driver} navigator={navigator} />
          <DeleteButton isOpen={isOpen} onRoomDelete={onRoomDelete} />
        </S.Sidebar>
      </PairRoomCard>
    </S.Layout>
  );
};

export default PairListCard;
