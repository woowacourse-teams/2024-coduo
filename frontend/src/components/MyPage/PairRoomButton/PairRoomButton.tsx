import { useState } from 'react';

import { IoIosArrowForward } from 'react-icons/io';

import PairRoomDeleteModal from '@/components/MyPage/PairRoomDeleteModal/PairRoomDeleteModal';

import { deletePairRoom, type PairRoomStatus } from '@/apis/pairRoom';

import * as S from './PairRoomButton.styles';

interface PairRoomButtonProps {
  driver: string;
  navigator: string;
  status: PairRoomStatus;
  accessCode: string;
}

const PairRoomButton = ({ driver, navigator, status, accessCode }: PairRoomButtonProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = (event: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleDeletePairRoom = async () => {
    await deletePairRoom(accessCode);
    setIsDeleteModalOpen(false);
  };

  return (
    <S.Layout>
      <S.Link to={`/room/${accessCode}`}>
        <S.PairRoomButton $status={status}>
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
            입장
            <IoIosArrowForward size="1.8rem" />
          </S.ConnectText>
        </S.PairRoomButton>
      </S.Link>
      <S.DeleteButton onClick={handleOpenDeleteModal} />
      <PairRoomDeleteModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        handleDeletePairRoom={handleDeletePairRoom}
      />
    </S.Layout>
  );
};

export default PairRoomButton;
