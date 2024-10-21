import Button from '@/components/common/Button/Button';

import * as S from './RetrospectButton.styles';

const RetrospectButtonDisabled = () => {
  return (
    <S.Layout>
      <Button size="lg" disabled={true}>
        회고 작성
      </Button>
      <S.ButtonPrompt>로그인 후 현재 페어룸에 등록된 사람만 회고를 작성할 수 있어요.</S.ButtonPrompt>
    </S.Layout>
  );
};

export default RetrospectButtonDisabled;
