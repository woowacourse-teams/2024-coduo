import { IoIosArrowForward } from 'react-icons/io';

import { GithubLogoWhite } from '@/assets';

import Button from '@/components/_common/Button/Button';

import { theme } from '@/styles/theme';

import * as S from './RepositoryButton.styles';

interface RepositoryButtonProps {
  id: string;
  name: string;
  onSelect: (currentRepo: string) => void;
}

const RepositoryButton = ({ id, name, onSelect }: RepositoryButtonProps) => {
  return (
    <S.Layout>
      <Button
        width="30rem"
        borderRadius="5px"
        color="#000000"
        fontSize={theme.fontSize.md}
        fontWeight="medium"
        textAlign="right"
        key={id}
        name={name}
        animation={false}
        onClick={(event) => onSelect(event.currentTarget.name)}
      >
        <S.InfoContainer>
          <S.GithubLogo src={GithubLogoWhite} alt="" />
          {name}
        </S.InfoContainer>
      </Button>
      <S.RepositoryLink
        to={`https://github.com/coduo-missions/${name}`}
        target="_blank"
        aria-label={`${name} 레포지토리로 이동하기`}
      >
        리포지토리로 이동하기
        <IoIosArrowForward />
      </S.RepositoryLink>
    </S.Layout>
  );
};

export default RepositoryButton;
