import { IoIosArrowForward } from 'react-icons/io';

import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal';
import Spinner from '@/components/common/Spinner/Spinner';

import type { PairRoomStatus } from '@/apis/pairRoom';

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

  if (isPending) {
    return (
      <S.Layout>
        <Spinner />
      </S.Layout>
    );
  }

  return (
    <S.Layout>
      <S.LinkWrapper to={`/room/${accessCode}`} state={{ valid: true }} replace={true}>
        <S.PairRoomButton $status={status} $color="secondary">
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
      <ConfirmModal
        isOpen={isModalOpen}
        close={closeModal}
        title="정말 삭제하시겠습니까?"
        subTitle="투두 리스트, 레퍼런스 링크 등 모든 데이터가 삭제됩니다."
        confirmText="삭제하기"
        onConfirm={handleDeletePairRoom}
      />
    </S.Layout>
  );
};

export default PairRoomButton;
