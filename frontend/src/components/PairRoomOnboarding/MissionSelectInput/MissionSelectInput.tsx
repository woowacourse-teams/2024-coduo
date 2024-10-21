import Spinner from '@/components/common/Spinner/Spinner';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';
import RepositoryButton from '@/components/PairRoomOnboarding/RepositoryButton/RepositoryButton';

import useGetRepositories from '@/queries/PairRoomOnboarding/useGetRepositories';

import * as S from './MissionSelectInput.styles';

interface MissionSelectInputProps {
  onSelect: (repositoryName: string) => void;
}

const MissionSelectInput = ({ onSelect }: MissionSelectInputProps) => {
  const { repositories, isFetching } = useGetRepositories();

  return (
    <S.Layout aria-label="총 2개의 설정 항목 중 1번째 항목입니다.">
      <S.HeaderContainer>
        <S.TitleContainer>
          <S.Title>미션 선택</S.Title>
          <S.SubTitle>구현해 볼 미션 레포지토리를 선택해 주세요.</S.SubTitle>
        </S.TitleContainer>
        <InformationBox
          title="어떻게 미션을 선택할 수 있나요?"
          description="미션을 선택하고 해당 미션 레포지토리에 원하는 이름으로 브랜치를 생성하세요. 생성된 브랜치로 이동하여 미션 코드를 관리할 수 있습니다."
        />
      </S.HeaderContainer>
      <S.RepositoryContainer>
        {isFetching ? (
          <Spinner size="sm" />
        ) : (
          repositories.map((repository) => {
            return (
              <RepositoryButton key={repository.id} id={repository.id} name={repository.name} onSelect={onSelect} />
            );
          })
        )}
      </S.RepositoryContainer>
    </S.Layout>
  );
};

export default MissionSelectInput;
