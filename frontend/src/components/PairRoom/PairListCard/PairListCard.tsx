import { useState } from 'react';

import ConfirmModal from '@/components/PairRoom/ConfirmModal/ConfirmModal';
import AccessCodeSection from '@/components/PairRoom/PairListCard/AccessCodeSection/AccessCodeSection';
import CompleteRoomButton from '@/components/PairRoom/PairListCard/CompleteRoomButton/CompleteRoomButton';
import Header from '@/components/PairRoom/PairListCard/Header/Header';
import PairListSection from '@/components/PairRoom/PairListCard/PairListSection/PairListSection';
import RepositorySection from '@/components/PairRoom/PairListCard/RepositorySection/RepositorySection';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import useModal from '@/hooks/common/useModal';

import useCompletePairRoom from '@/queries/PairRoom/useCompletePairRoom';

import * as S from './PairListCard.styles';

interface PairListCardProps {
  driver: string;
  navigator: string;
  missionUrl: string;
  accessCode: string;
}

const PairListCard = ({ driver, navigator, missionUrl, accessCode }: PairListCardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { handleCompletePairRoom } = useCompletePairRoom(accessCode);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <S.Layout $isOpen={isOpen} aria-label="페어 목록">
      <PairRoomCard>
        <Header isOpen={isOpen} toggleOpen={toggleOpen} />
        <S.Sidebar>
          <AccessCodeSection isOpen={isOpen} accessCode={accessCode} />
          {missionUrl !== '' && <RepositorySection isOpen={isOpen} missionUrl={missionUrl} />}
          <PairListSection isOpen={isOpen} driver={driver} navigator={navigator} />
          <CompleteRoomButton isOpen={isOpen} openModal={openModal} />
        </S.Sidebar>
      </PairRoomCard>
      <ConfirmModal isOpen={isModalOpen} onConfirm={handleCompletePairRoom} close={closeModal} />
    </S.Layout>
  );
};

export default PairListCard;
