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
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleCopy = () => {
    window.navigator.clipboard.writeText(roomCode);
    alert('방 코드가 복사되었습니다.');
  };

  return (
    <S.Layout $isOpen={isOpen} onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <PairRoomCard>
        <Header isOpen={isOpen} toggleOpen={toggleOpen} />
        <S.Sidebar>
          <RoomCodeSection isOpen={isOpen} roomCode={roomCode} onCopy={handleCopy} />
          <PairListSection isOpen={isOpen} driver={driver} navigator={navigator} />
          <DeleteButton isOpen={isOpen} onRoomDelete={onRoomDelete} />
        </S.Sidebar>
      </PairRoomCard>
    </S.Layout>
  );
};

export default PairListCard;
