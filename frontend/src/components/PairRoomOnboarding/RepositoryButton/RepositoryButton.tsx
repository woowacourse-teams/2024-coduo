import { GithubLogoWhite } from '@/assets';

import Button from '@/components/common/Button/Button';

import * as S from './RepositoryButton.styles';

interface RepositoryButtonProps {
  name: string;
  id: string;
  onSelect: (currentRepo: string) => void;
}

const RepositoryButton = ({ name, id, onSelect }: RepositoryButtonProps) => {
  return (
    <Button
      css={S.buttonStyles}
      key={id}
      name={name}
      filled={false}
      onClick={(event) => onSelect(event.currentTarget.name)}
    >
      <S.Layout>
        <S.GithubLogo src={GithubLogoWhite} alt="" />
        {name}
      </S.Layout>
    </Button>
  );
};

export default RepositoryButton;
