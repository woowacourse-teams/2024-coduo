import { IoIosArrowForward } from 'react-icons/io';

import Spinner from '@/components/common/Spinner/Spinner';
import PairRoomDeleteModal from '@/components/MyPage/PairRoomDeleteModal/PairRoomDeleteModal';

import { type PairRoomStatus } from '@/apis/pairRoom';

import useModal from '@/hooks/common/useModal';

import useDeletePairRoom from '@/queries/MyPage/useDeleteRoom';

import * as S from './PairRoomButton.styles';

interface PairRoomButtonProps {
  driver: string;
  navigator: string;
  status: PairRoomStatus;
  accessCode: string;
}

const PairRoomButton = ({ driver, navigator, status, accessCode }: PairRoomButtonProps) => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { mutate, isPending } = useDeletePairRoom();
  const handleOpenDeleteModal = (event: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    openModal();
  };

  const handleDeletePairRoom = async () => {
    mutate(accessCode);
    closeModal();
  };

  return (
    <S.Layout>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <S.LinkWrapper to={`/room/${accessCode}`} state={{ valid: true }} replace={true}>
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
          </S.LinkWrapper>
          <S.DeleteButton onClick={handleOpenDeleteModal} />
          <PairRoomDeleteModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            handleDeletePairRoom={handleDeletePairRoom}
          />
        </>
      )}
    </S.Layout>
  );
};

export default PairRoomButton;
