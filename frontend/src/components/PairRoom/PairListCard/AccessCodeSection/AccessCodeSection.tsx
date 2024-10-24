import { FaRegPaste } from 'react-icons/fa6';

import useCopyClipBoard from '@/hooks/common/useCopyClipboard';

import * as S from './AccessCodeSection.styles';

interface AccessCodeSectionProps {
  isOpen: boolean;
  accessCode: string;
}

const AccessCodeSection = ({ isOpen, accessCode }: AccessCodeSectionProps) => {
  const [, onCopy] = useCopyClipBoard();

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  return (
    <S.Layout
      role="button"
      $isOpen={isOpen}
      onClick={() => handleCopyClipBoard(accessCode)}
      aria-label={`페어룸 코드는 ${accessCode}입니다. 클릭하시면 페어룸 코드가 클립보드에 복사됩니다.`}
    >
      {isOpen && (
        <S.AccessCodeWrapper>
          <S.AccessCodeTitle>방 코드</S.AccessCodeTitle>
          <S.AccessCode>{accessCode}</S.AccessCode>
        </S.AccessCodeWrapper>
      )}
      <FaRegPaste size="1.5rem" role="presentation" />
    </S.Layout>
  );
};

export default AccessCodeSection;
