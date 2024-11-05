import { useState } from 'react';

import CategoryManagementModal from '@/components/CompletedPairRoom/CategoryManagementModal/CategoryManagementModal';
import Header from '@/components/CompletedPairRoom/ReferenceCard/Header/Header';
import ReferenceList from '@/components/CompletedPairRoom/ReferenceCard/ReferenceList/ReferenceList';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import useModal from '@/hooks/_common/useModal';

import { useGetReference } from '@/queries/PairRoom/reference/query';
import useCategory, { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_VALUE } from '@/queries/PairRoom/useCategory';

import { findValueById } from '@/utils/findOption';

import * as S from './ReferenceCard.styles';

interface ReferenceCardProps {
  accessCode: string;
}

const ReferenceCard = ({ accessCode }: ReferenceCardProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(DEFAULT_CATEGORY_ID);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { categories, isCategoryExist } = useCategory(accessCode);
  const { references } = useGetReference(selectedCategoryId, accessCode);

  const selectedCategoryName = findValueById(categories, selectedCategoryId) || DEFAULT_CATEGORY_VALUE;

  return (
    <S.Layout>
      <PairRoomCard>
        <Header selectedCategoryName={selectedCategoryName} onButtonClick={openModal} />
        <S.Body>
          <ReferenceList references={references} />
        </S.Body>
      </PairRoomCard>
      <CategoryManagementModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        categories={categories}
        isCategoryExist={isCategoryExist}
        selectedCategoryId={selectedCategoryId}
        handleSelectedCategoryId={(categoryId: string) => setSelectedCategoryId(categoryId)}
      />
    </S.Layout>
  );
};

export default ReferenceCard;
