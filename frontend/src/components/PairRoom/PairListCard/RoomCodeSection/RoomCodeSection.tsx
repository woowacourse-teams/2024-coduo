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
    <S.Layout
      $isOpen={isOpen}
      onClick={() => handleCopyClipBoard(roomCode)}
      aria-label={`페어룸 코드는 ${roomCode}입니다. 클릭하시면 페어룸 코드가 클립보드에 복사됩니다.`}
    >
      {isOpen && (
        <S.RoomCodeWrapper>
          <S.RoomCodeTitle>방 코드</S.RoomCodeTitle>
          <S.RoomCode>{roomCode}</S.RoomCode>
        </S.RoomCodeWrapper>
      )}
      <FaRegPaste size="1.5rem" role="presentation" />
    </S.Layout>
  );
};

export default RoomCodeSection;
