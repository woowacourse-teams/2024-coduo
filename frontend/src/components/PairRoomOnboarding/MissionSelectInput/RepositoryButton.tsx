import Button from '@/components/common/Button/Button';

import * as S from './MissionSelectInput.styles';

interface RepositoryButtonProps {
  name: string;
  id: string;
  handleSelectMission: (currentRepo: string) => void;
}

const RepositoryButton = ({ name, id, handleSelectMission }: RepositoryButtonProps) => {
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

export default RepositoryButton;
