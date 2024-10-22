import { ImExit } from 'react-icons/im';

import * as S from './CompleteRoomButton.styles';

interface CompleteRoomButtonProps {
  isOpen: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const CompleteRoomButton = ({ isOpen, onClick, disabled = false }: CompleteRoomButtonProps) => {
  return (
    <S.Layout
      onClick={onClick}
      disabled={disabled}
      aria-label={disabled ? '로그인 후 페어룸에 참여하면 방을 종료할 수 있습니다. ' : '클릭 시 페어룸이 종료됩니다.'}
    >
      {disabled ? (
        <S.StyledTooltip message="로그인 후 페어룸에 참여하면 방을 종료할 수 있습니다." direction="top">
          <ImExit size="1.5rem" />
          {isOpen && <span>&nbsp;페어룸 종료하기</span>}
        </S.StyledTooltip>
      ) : (
        <>
          <ImExit size="1.5rem" />
          {isOpen && <span>페어룸 종료하기</span>}
        </>
      )}
    </S.Layout>
  );
};

export default CompleteRoomButton;
