import { useState } from 'react';

import Spinner from '@/components/common/Spinner/Spinner';
import CreateBranchModal from '@/components/PairRoomOnboarding/CreateBranchModal/CreateBranchModal';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';
import RepositoryButton from '@/components/PairRoomOnboarding/RepositoryButton/RepositoryButton';

import useModal from '@/hooks/common/useModal';

import useCreateBranch from '@/queries/PairRoomOnboarding/useCreateBranch';
import useGetRepositories from '@/queries/PairRoomOnboarding/useGetRepositories';

import * as S from './MissionSelect.styles';

// interface MissionSelectInputProps {
//   onCreateBranch: (currentRepository: string, branchName: string) => void;
// }

interface Repository {
  archive_url: string;
  name: string;
  description: string;
  id: string;
}

const MissionSelect = () => {
  const [currentRepository, setCurrentRepository] = useState('');

  const { isModalOpen, closeModal, openModal } = useModal();
  const { repositories, isFetching } = useGetRepositories();

  const { handleCreateBranch } = useCreateBranch();

  const handleSelectRepository = (currentRepository: string) => {
    setCurrentRepository(currentRepository);
    openModal();
  };

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
      {/* TODO: 타이틀, 서브타이틀, 인포박스 각 온보딩 설명마다 Header 에 프롭스 넘겨주는걸로 추상화를 할 지 고민해보자. */}

      <S.RepositoryContainer>
        {isFetching ? (
          <Spinner size="sm" />
        ) : (
          repositories.map((repository: Repository) => {
            return (
              <RepositoryButton
                key={repository.id}
                name={repository.name}
                id={repository.id}
                onSelect={handleSelectRepository}
              />
            );
          })
        )}
      </S.RepositoryContainer>

      <CreateBranchModal
        isOpen={isModalOpen}
        close={closeModal}
        currentRepository={currentRepository}
        onComplete={(branchName: string) => handleCreateBranch(currentRepository, branchName)}
      />
    </S.Layout>
  );
};

export default MissionSelect;
