import { IoIosArrowForward } from 'react-icons/io';

import type { PairRoomStatus } from '@/apis/pairRoom';

import * as S from './PairRoomButton.styles';

interface PairRoomButtonProps {
  driver: string;
  navigator: string;
  status: PairRoomStatus;
}

const PairRoomButton = ({ driver, navigator, status }: PairRoomButtonProps) => {
  return (
    <S.Layout $status={status}>
      <S.RoleTextContainer>
        <S.RoleText $status={status}>
          <span>드라이버</span>
          {driver}
        </S.RoleText>
        <S.RoleText $status={status}>
          <span>내비게이터</span>
          {navigator}
        </S.RoleText>
      </S.RoleTextContainer>
      <S.StatusText $status={status}>{status === 'IN_PROGRESS' ? '진행 중' : '진행 완료'}</S.StatusText>
      <S.ConnectText>
        접속
        <IoIosArrowForward size="1.8rem" />
      </S.ConnectText>
    </S.Layout>
  );
};

export default PairRoomButton;
