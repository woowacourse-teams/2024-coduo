import Button from '@/components/common/Button/Button';

import * as S from './StartMission.styles';

interface MissionRepository {
  name: string;
  id: string;
  handleSelectMission: (currentRepo: string) => void;
}

const MissionRepository = ({ name, id, handleSelectMission }: MissionRepository) => {
  return (
    <Button
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
