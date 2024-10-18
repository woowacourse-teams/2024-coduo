import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import MissionSettingSection from '@/components/PairRoomOnboarding/MissionSettingSection/MissionSettingSection';
import PairRoomSettingSection from '@/components/PairRoomOnboarding/PairRoomSettingSection/PairRoomSettingSection';

import useCreateBranch from '@/queries/PairRoomOnboarding/useCreateBranch';

import * as S from './PairRoomOnboarding.styles';

const PairRoomOnboarding = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mission = searchParams.get('mission');

  const [repositoryName, setRepositoryName] = useState('');

  const { handleCreateBranch, isSuccess } = useCreateBranch();

  const handleRepositoryName = (repositoryName: string) => setRepositoryName(repositoryName);

  return (
    <S.Layout>
      <S.Container>
        <S.Title>{mission === 'true' ? '미션과 함께 시작하기' : '그냥 시작하기'}</S.Title>
        {mission === 'true' && !isSuccess && (
          <MissionSettingSection
            aria-label={repositoryName}
            repositoryName={repositoryName}
            onRepositoryName={handleRepositoryName}
            onCreateBranch={handleCreateBranch}
          />
        )}
        {((mission === 'true' && isSuccess) || mission === 'false') && (
          <PairRoomSettingSection repositoryName={repositoryName} />
        )}
      </S.Container>
    </S.Layout>
  );
};

export default PairRoomOnboarding;
