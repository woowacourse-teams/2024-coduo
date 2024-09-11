import { IoIosArrowForward } from 'react-icons/io';

import { GithubLogoWhite } from '@/assets';

import Button from '@/components/common/Button/Button';

import { theme } from '@/styles/theme';

import * as S from './RepositoryButton.styles';

interface RepositoryButtonProps {
  name: string;
  id: string;
  onSelect: (currentRepo: string) => void;
}

const RepositoryButton = ({ name, id, onSelect }: RepositoryButtonProps) => {
  return (
    <S.Layout>
      <Button
        css={S.buttonStyles}
        key={id}
        name={name}
        filled={false}
        animation={false}
        onClick={(event) => onSelect(event.currentTarget.name)}
      >
        <S.InfoContainer>
          <S.GithubLogo src={GithubLogoWhite} alt="" />
          {name}
        </S.InfoContainer>
      </Button>
      <S.RepositoryLink to={`https://github.com/coduo-missions/${name}`} target="_blank">
        <IoIosArrowForward size={theme.fontSize.base} color={theme.color.black[20]} />
      </S.RepositoryLink>
    </S.Layout>
  );
};

export default RepositoryButton;
