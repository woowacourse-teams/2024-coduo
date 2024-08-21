import { useState } from 'react';

import Spinner from '@/components/common/Spinner/Spinner';
import CreateBranchModal from '@/components/PairRoomOnboarding/CreateBranchModal/CreateBranchModal';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';
import RepositoryButton from '@/components/PairRoomOnboarding/MissionSelectInput/RepositoryButton';

import useModal from '@/hooks/common/useModal';

import useGetRepositories from '@/queries/PairRoomOnboarding/useGetRepositories';

import * as S from './MissionSelectInput.styles';

interface MissionSelectInputProps {
  onCreateBranch: (currentRepository: string, branchName: string) => void;
}

interface Repository {
  archive_url: string;
  name: string;
  description: string;
  id: string;
}

const MissionSelectInput = ({ onCreateBranch }: MissionSelectInputProps) => {
  const { repositories, isFetching } = useGetRepositories();

  const [currentRepo, setCurrentRepo] = useState('');

  const handleSelectMission = (currentRepo: string) => {
    setCurrentRepo(currentRepo);
    openModal();
  };

  const { isModalOpen, closeModal, openModal } = useModal();

  return (
    <S.Layout>
      <S.HeaderContainer>
        <S.TitleContainer>
          <S.Title>미션 선택</S.Title>
          <S.SubTitle>구현해 볼 미션의 레포지토리를 선택해 주세요.</S.SubTitle>
        </S.TitleContainer>
        <InformationBox
          title="미션을 선택하면 어떻게 되나요?"
          description="미션을 선택하고 미션 시작 버튼을 누르면 해당 레포지토리에 깃허브 아이디 이름으로 브랜치가 생성됩니다. 생성된 브랜치로 PR 을 보내보세요!"
        />
      </S.HeaderContainer>
      <S.Repositories>
        {isFetching ? (
          <Spinner />
        ) : (
          repositories.map((repository: Repository) => {
            return (
              <RepositoryButton
                key={repository.id}
                name={repository.name}
                id={repository.id}
                handleSelectMission={handleSelectMission}
              />
            );
          })
        )}
      </S.Repositories>
      <CreateBranchModal
        currentRepo={currentRepo}
        onComplete={(branchName: string) => onCreateBranch(currentRepo, branchName)}
        isOpen={isModalOpen}
        close={closeModal}
      />
    </S.Layout>
  );
};

export default MissionSelectInput;
