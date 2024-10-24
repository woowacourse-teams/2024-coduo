import { IoIosArrowForward } from 'react-icons/io';

import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal';
import Spinner from '@/components/common/Spinner/Spinner';

import useModal from '@/hooks/common/useModal';

import { useDeleteRetrospect } from '@/queries/Retrospect/useDeleteRetrospect';

import * as S from './PairRoomButton.styles';

interface RetrospectButtonProps {
  answer: string;
  accessCode: string;
}

const RetrospectButton = ({ accessCode, answer }: RetrospectButtonProps) => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { mutate, isPending } = useDeleteRetrospect();

  const handleOpenDeleteModal = (event: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    openModal();
  };

  const handleDeletePairRoom = async () => {
    mutate({ accessCode });
    closeModal();
  };

  const splitAnswer = (answer: string): string => {
    return answer.length > 10 ? answer.slice(0, 10) + '...' : answer;
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
      <S.LinkWrapper to={`/room/${accessCode}/retrospect`} state={{ valid: true }}>
        <S.PairRoomButton $status="IN_PROGRESS">
          <S.RoleTextContainer>
            <S.RoleText $status="IN_PROGRESS">
              <span>{accessCode}</span>
              {splitAnswer(answer)}
            </S.RoleText>
          </S.RoleTextContainer>
          <S.ConnectText>
            더보기
            <IoIosArrowForward size="1.8rem" />
          </S.ConnectText>
        </S.PairRoomButton>
      </S.LinkWrapper>
      <S.DeleteButton onClick={handleOpenDeleteModal} />
      <ConfirmModal
        isOpen={isModalOpen}
        close={closeModal}
        title="정말 삭제하시겠습니까?"
        subTitle="해당 회고의 모든 내용이 삭제됩니다."
        confirmText="삭제하기"
        onConfirm={handleDeletePairRoom}
      />
    </S.Layout>
  );
};

export default RetrospectButton;
