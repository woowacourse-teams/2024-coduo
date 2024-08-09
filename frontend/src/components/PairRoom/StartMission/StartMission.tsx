import { useEffect, useState } from 'react';

import { BsArrowReturnRight } from 'react-icons/bs';

import Button from '@/components/common/Button/Button';
import { InputStatus } from '@/components/common/Input/Input.type';
import { Modal } from '@/components/common/Modal';
import MissionRepository from '@/components/PairRoom/StartMission/MissionRepository';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';

import useInput from '@/hooks/common/useInput';
import useModal from '@/hooks/common/useModal';

import useGetBranches from '@/queries/github/useGetBranches';
import useGetRepositories from '@/queries/github/useGetRepositories';

import { theme } from '@/styles/theme';

import * as S from './StartMission.styles';

interface StartMissionProps {
  handleStartMission: (userId: string, currentRepo: string) => void;
}
const StartMission = ({ handleStartMission }: StartMissionProps) => {
  const { repositories, isFetching } = useGetRepositories();
  const [currentRepo, setCurrentRepo] = useState('');

  interface RepositoryProps {
    archive_url: string;
    name: string;
    description: string;
    id: string;
  }
  const handleSelectMission = (currentRepo: string) => {
    setCurrentRepo(currentRepo);
    openModal();
  };

  const { isModalOpen, closeModal, openModal } = useModal();
  const { isAlreadyCreated, refetch } = useGetBranches(currentRepo);
  const { value, message, handleChange, status } = useInput();

  const validate = (name: string): { status: InputStatus; message: string } => {
    if (isAlreadyCreated(name)) return { status: 'ERROR', message: '중복된 브랜치 이름 입니다.' };
    return { status: 'DEFAULT', message: '' };
  };

  useEffect(() => {
    if (currentRepo !== '') refetch();
  }, [currentRepo]);

  return (
    <>
      <Modal isOpen={isModalOpen} close={closeModal} size="sm">
        <Modal.CloseButton close={closeModal} />
        <Modal.Header title="미션 시작하기" subTitle="브랜치를 생성하여 미션을 시작해주세요."></Modal.Header>
        <Modal.Body>
          <S.ModalContainer>
            <S.MissionRepository> {currentRepo}</S.MissionRepository>
            <S.MissionBranchBox>
              <BsArrowReturnRight size={'3rem'} color={theme.color.black[70]} />
              <S.MissionBranch value={value} onChange={(event) => handleChange(event, validate(event.target.value))} />
            </S.MissionBranchBox>
            <S.Message>{message}</S.Message>
          </S.ModalContainer>
        </Modal.Body>
        <Modal.Footer position="CENTER">
          <Button
            disabled={status !== 'DEFAULT' || value === ''}
            onClick={() => handleStartMission(currentRepo, value)}
          >
            브랜치 생성하기
          </Button>
        </Modal.Footer>
      </Modal>

      <S.Layout>
        <S.HeaderContainer>
          <Modal.Header title="미션 선택" subTitle="구현해 볼 미션 레포지토리를 선택해주세요." />

          <InformationBox
            title="미션을 선택하면 어떻게 되나요?"
            description="미션을 선택하고 미션 시작 버튼을 누르면 해당 레포지토리에 깃허브 아이디 이름으로 브랜치가 생성됩니다. 생성된 브랜치로 PR 을 보내보세요!"
          />
        </S.HeaderContainer>

        <S.Repositories>
          {isFetching ? (
            <div>loading</div>
          ) : (
            repositories.map((repository: RepositoryProps) => {
              return (
                <MissionRepository
                  key={repository.id}
                  name={repository.name}
                  id={repository.id}
                  handleSelectMission={handleSelectMission}
                />
              );
            })
          )}
        </S.Repositories>
      </S.Layout>
    </>
  );
};

export default StartMission;
