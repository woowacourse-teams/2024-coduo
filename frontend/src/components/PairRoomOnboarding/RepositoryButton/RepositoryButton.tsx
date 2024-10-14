import { IoIosArrowForward } from 'react-icons/io';

import { GithubLogoWhite } from '@/assets';

import Button from '@/components/common/Button/Button';

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
        레포지토리로 이동하기
        <IoIosArrowForward />
      </S.RepositoryLink>
    </S.Layout>
  );
};

export default RepositoryButton;
