import { useState } from 'react';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import AddReferenceForm from '@/components/PairRoom/ReferenceCard/AddReferenceForm/AddReferenceForm';
import CategoryManagementModal from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/CategoryManagementModal';
import Header from '@/components/PairRoom/ReferenceCard/Header/Header';
import ReferenceList from '@/components/PairRoom/ReferenceCard/ReferenceList/ReferenceList';

import useModal from '@/hooks/common/useModal';
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
    <>
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
            <S.Footer>
              <AddReferenceForm
                accessCode={accessCode}
                categories={categories}
                isCategoryExist={isCategoryExist}
                getCategoryNameById={getCategoryNameById}
              />
            </S.Footer>
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
