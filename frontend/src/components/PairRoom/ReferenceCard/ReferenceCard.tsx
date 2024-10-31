import { useState } from 'react';

import CategoryManagementModal from '@/components/PairRoom/CategoryManagementModal/CategoryManagementModal';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import Footer from '@/components/PairRoom/ReferenceCard/Footer/Footer';
import Header from '@/components/PairRoom/ReferenceCard/Header/Header';
import ReferenceList from '@/components/PairRoom/ReferenceCard/ReferenceList/ReferenceList';

import useModal from '@/hooks/_common/useModal';
import useCategories, { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_VALUE } from '@/hooks/PairRoom/useCategories';

import { useGetReference } from '@/queries/PairRoom/reference/query';

import * as S from './ReferenceCard.styles';

interface ReferenceCardProps {
  accessCode: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const ReferenceCard = ({ accessCode, isOpen, toggleIsOpen }: ReferenceCardProps) => {
  const [selectedFilteringCategoryId, setSelectedFilteringCategoryId] = useState(DEFAULT_CATEGORY_ID);
  const { isModalOpen, openModal, closeModal } = useModal();

  const { categories, isCategoryExist, getCategoryNameById } = useCategories(accessCode);

  const { data: references } = useGetReference(selectedFilteringCategoryId, accessCode);
  const selectedFilteringCategoryName = getCategoryNameById(selectedFilteringCategoryId) || DEFAULT_CATEGORY_VALUE;

  return (
    <S.Layout>
      <PairRoomCard>
        <Header
          isOpen={isOpen}
          selectedFilteringCategoryName={selectedFilteringCategoryName}
          toggleIsOpen={toggleIsOpen}
          onButtonClick={openModal}
        />
        <S.Body $isOpen={isOpen}>
          <ReferenceList references={references} accessCode={accessCode} />
          <Footer accessCode={accessCode} categories={categories} />
        </S.Body>
      </PairRoomCard>
      <CategoryManagementModal
        accessCode={accessCode}
        isOpen={isModalOpen}
        closeModal={closeModal}
        categories={categories}
        isCategoryExist={isCategoryExist}
        selectedCategory={selectedFilteringCategoryId}
        handleSelectCategory={(categoryId: string) => setSelectedFilteringCategoryId(categoryId)}
      />
    </S.Layout>
  );
};

export default ReferenceCard;
