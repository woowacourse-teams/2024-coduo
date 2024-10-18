import { ImExit } from 'react-icons/im';

import * as S from './CompleteRoomButton.styles';

interface CompleteRoomButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const CompleteRoomButton = ({ isOpen, onClick }: CompleteRoomButtonProps) => (
  <S.Layout onClick={onClick}>
    <ImExit size="1.5rem" />
    {isOpen && <span>페어룸 종료하기</span>}
  </S.Layout>
);

export default CompleteRoomButton;
