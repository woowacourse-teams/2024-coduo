import { FaRegPaste } from 'react-icons/fa6';

import useCopyClipBoard from '@/hooks/common/useCopyClipboard';

import * as S from './RoomCodeSection.styles';

interface RoomCodeSectionProps {
  isOpen: boolean;
  roomCode: string;
}

const RoomCodeSection = ({ isOpen, roomCode }: RoomCodeSectionProps) => {
  const [, onCopy] = useCopyClipBoard();

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  return (
    <S.Layout $isOpen={isOpen} onClick={() => handleCopyClipBoard(roomCode)}>
      {isOpen && (
        <S.RoomCodeWrapper>
          <S.RoomCodeTitle>방 코드</S.RoomCodeTitle>
          <S.RoomCode>{roomCode}</S.RoomCode>
        </S.RoomCodeWrapper>
      )}
      <FaRegPaste size="1.5rem" />
    </S.Layout>
  );
};

export default RoomCodeSection;
