import { IoIosArrowForward } from 'react-icons/io';

import Spinner from '@/components/common/Spinner/Spinner';
import DeleteModal from '@/components/MyPage/DeleteModal/DeleteModal';

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

  return (
    <S.Layout>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <S.LinkWrapper to={`room/${accessCode}/retrospect`} state={{ valid: true }}>
            <S.PairRoomButton $status="IN_PROGRESS">
              <S.RoleTextContainer>
                <S.RoleText $status="IN_PROGRESS">
                  <span>{accessCode}</span>
                  {answer}
                </S.RoleText>
              </S.RoleTextContainer>
              <S.ConnectText>
                더보기
                <IoIosArrowForward size="1.8rem" />
              </S.ConnectText>
            </S.PairRoomButton>
          </S.LinkWrapper>
          <S.DeleteButton onClick={handleOpenDeleteModal} />
          <DeleteModal
            description="해당 회고의"
            dangerText="모든 내용이 삭제"
            isOpen={isModalOpen}
            closeModal={closeModal}
            handleDeletePairRoom={handleDeletePairRoom}
          />
        </>
      )}
    </S.Layout>
  );
};

export default RetrospectButton;
