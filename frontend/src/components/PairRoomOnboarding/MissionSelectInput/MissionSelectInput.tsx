import { useState } from 'react';

import Spinner from '@/components/common/Spinner/Spinner';
import CreateBranchModal from '@/components/PairRoomOnboarding/CreateBranchModal/CreateBranchModal';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';
import RepositoryButton from '@/components/PairRoomOnboarding/RepositoryButton/RepositoryButton';

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
          description="미션을 선택하고 해당 미션 레포지토리에 원하는 이름으로 브랜치를 생성하세요. 생성된 브랜치로 이동하여 미션 코드를 관리할 수 있습니다."
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
                onSelect={handleSelectMission}
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
