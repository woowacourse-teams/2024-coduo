import Button from '@/components/common/Button/Button';

import * as S from './StartMission.styles';

import useGetBranches from '@/queries/github/useGetBranches';

interface MissionRepository {
  name: string;
  id: string;
  handleSelectMission: (currentRepo: string) => void;
  branchName: string;
}

const MissionRepository = ({ name, id, handleSelectMission, branchName }: MissionRepository) => {
  const { isAlreadyCreated } = useGetBranches(name);
  return (
    <Button
      disabled={isAlreadyCreated(branchName)}
      filled={false}
      color="secondary"
      key={id}
      name={name}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleSelectMission(event.currentTarget.name);
      }}
      css={S.MissionButton}
    >
      💻 {name}
    </Button>
  );
};

export default MissionRepository;
