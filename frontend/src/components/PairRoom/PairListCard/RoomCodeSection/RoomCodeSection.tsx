import { FaRegPaste } from 'react-icons/fa6';

import * as S from './RoomCodeSection.styles';

interface RoomCodeSectionProps {
  isOpen: boolean;
  roomCode: string;
  onCopy: () => void;
}

const RoomCodeSection = ({ isOpen, roomCode, onCopy }: RoomCodeSectionProps) => (
  <S.Layout $isOpen={isOpen} onClick={onCopy}>
    {isOpen && (
      <S.RoomCodeWrapper>
        <S.RoomCodeTitle>방 코드</S.RoomCodeTitle>
        <S.RoomCode>{roomCode}</S.RoomCode>
      </S.RoomCodeWrapper>
    )}
    <FaRegPaste size="1.5rem" />
  </S.Layout>
);

export default RoomCodeSection;
