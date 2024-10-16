import { useState } from 'react';

import CategoryManagementModal from '@/components/CompletedPairRoom/ReferenceCard/CategoryManagementModal/CategoryManagementModal';
import Header from '@/components/CompletedPairRoom/ReferenceCard/Header/Header';
import ReferenceList from '@/components/CompletedPairRoom/ReferenceCard/ReferenceList/ReferenceList';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import useModal from '@/hooks/common/useModal';
import useCategories, { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_VALUE } from '@/hooks/PairRoom/useCategories';

import { useGetReference } from '@/queries/PairRoom/reference/query';

import * as S from './ReferenceCard.styles';

interface ReferenceCardProps {
  accessCode: string;
}

const ReferenceCard = ({ accessCode }: ReferenceCardProps) => {
  const [selectedFilteringCategoryId, setSelectedFilteringCategoryId] = useState(DEFAULT_CATEGORY_ID);
  const { isModalOpen, openModal, closeModal } = useModal();

  const { categories, isCategoryExist, getCategoryNameById } = useCategories(accessCode);

  const { data: references } = useGetReference(selectedFilteringCategoryId, accessCode);
  const selectedFilteringCategoryName = getCategoryNameById(selectedFilteringCategoryId) || DEFAULT_CATEGORY_VALUE;

  return (
    <>
      <S.Layout>
        <PairRoomCard>
          <Header selectedFilteringCategoryName={selectedFilteringCategoryName} onButtonClick={openModal} />
          <S.Body>
            <ReferenceList references={references} />
          </S.Body>
        </PairRoomCard>
      </S.Layout>

      <CategoryManagementModal
        accessCode={accessCode}
        isOpen={isModalOpen}
        closeModal={closeModal}
        categories={categories}
        isCategoryExist={isCategoryExist}
        selectedCategory={selectedFilteringCategoryId}
        handleSelectCategory={(categoryId: string) => setSelectedFilteringCategoryId(categoryId)}
      />
    </>
  );
};

export default ReferenceCard;
