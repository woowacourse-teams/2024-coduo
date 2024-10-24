import { Link } from 'react-router-dom';

import { IoIosArrowForward } from 'react-icons/io';

import { GithubLogoWhite } from '@/assets';

import * as S from './RepositorySection.styles';

interface RepositorySectionProps {
  isOpen: boolean;
  missionUrl: string;
}

const RepositorySection = ({ isOpen, missionUrl }: RepositorySectionProps) => {
  return (
    <Link to={missionUrl} target="_blank" aria-label="클릭하시면 미션 리포지토리로 이동합니다.">
      <S.Layout $isOpen={isOpen}>
        <img src={GithubLogoWhite} alt="" />
        {isOpen && (
          <S.RepositoryWrapper>
            <S.RepositoryText>미션 리포지토리로 이동</S.RepositoryText>
            <IoIosArrowForward size="1.6rem" color="white" role="presentation" />
          </S.RepositoryWrapper>
        )}
      </S.Layout>
    </Link>
  );
};

export default RepositorySection;
