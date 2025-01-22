import useCopyClipBoard from '@/hooks/_common/useCopyClipboard';

import * as S from './SourceCode.styles';

interface SourceCodeProps {
  code: string;
}

const SourceCode = ({ code }: SourceCodeProps) => {
  const [, onCopy] = useCopyClipBoard();
  return (
    <S.Container>
      <S.Content>{code}</S.Content>
      <S.CopyIcon onClick={() => onCopy(code)} />
    </S.Container>
  );
};

export default SourceCode;
