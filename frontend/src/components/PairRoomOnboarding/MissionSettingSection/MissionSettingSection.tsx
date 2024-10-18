import Button from '@/components/common/Button/Button';
import { HiddenMessage } from '@/components/common/WebAccessibility/WebAccessibility.styles';
import CreateBranchInput from '@/components/PairRoomOnboarding/CreateBranchInput/CreateBranchInput';
import MissionSelectInput from '@/components/PairRoomOnboarding/MissionSelectInput/MissionSelectInput';

import useDebounce from '@/hooks/common/useDebounce';
import useAutoMoveIndex from '@/hooks/PairRoomOnboarding/useAutoMoveIndex';
import useMissionBranch from '@/hooks/PairRoomOnboarding/useMissionBranch';

import * as S from './MissionSettingSection.styles';

interface MissionSettingSectionProps {
  repositoryName: string;
  onRepositoryName: (repositoryName: string) => void;
  onCreateBranch: (repositoryName: string, branchName: string) => void;
}

const MissionSettingSection = ({ repositoryName, onRepositoryName, onCreateBranch }: MissionSettingSectionProps) => {
  const { branchName, isValidBranchName, resetBranchName, handleBranchName } = useMissionBranch();
  const { moveIndex } = useAutoMoveIndex(0, [repositoryName !== '', useDebounce(isValidBranchName, 500)]);

  const handleSelectMission = (repositoryName: string) => {
    onRepositoryName(repositoryName);
    resetBranchName();
  };

  return (
    <S.Layout>
      <HiddenMessage aria-live="polite">
        {repositoryName &&
          `${repositoryName} 레포지토리가 선택되었습니다. ${repositoryName} 레포지토리의 브랜치 이름을 입력해보세요.`}
      </HiddenMessage>
      <MissionSelectInput onSelect={handleSelectMission} />
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
