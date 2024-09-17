import Button from '@/components/common/Button/Button';
import CreateBranchInput from '@/components/PairRoomOnboarding/CreateBranchInput/CreateBranchInput';
import MissionSelectInput from '@/components/PairRoomOnboarding/MissionSelectInput/MissionSelectInput';

import useDebounce from '@/hooks/common/useDebounce';
import useAutoMoveIndex from '@/hooks/PairRoomOnboarding/useAutoMoveIndex';
import usePairRoomMission from '@/hooks/PairRoomOnboarding/usePairRoomMission';

import * as S from './MissionSettingSection.styles';

interface MissionSettingSectionProps {
  onCreateBranch: (repositoryName: string, branchName: string) => void;
}

const MissionSettingSection = ({ onCreateBranch }: MissionSettingSectionProps) => {
  const {
    repositoryName,
    branchName,
    isRepositorySelected,
    isValidBranchName,
    handleRepositoryName,
    handleBranchName,
  } = usePairRoomMission();

  const { moveIndex } = useAutoMoveIndex(0, [isRepositorySelected, useDebounce(isValidBranchName, 500)]);

  return (
    <S.Layout>
      <MissionSelectInput onRepositoryName={handleRepositoryName} />
      {moveIndex >= 1 && (
        <CreateBranchInput repositoryName={repositoryName} branchName={branchName} onBranchName={handleBranchName} />
      )}
      {moveIndex >= 2 && (
        <S.ButtonWrapper>
          <Button disabled={!isValidBranchName} onClick={() => onCreateBranch(repositoryName, branchName.value)}>
            브랜치 생성하기
          </Button>
        </S.ButtonWrapper>
      )}
    </S.Layout>
  );
};

export default MissionSettingSection;
