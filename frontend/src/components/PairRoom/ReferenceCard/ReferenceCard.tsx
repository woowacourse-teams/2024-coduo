import { useState } from 'react';

import CategoryManagementModal from '@/components/PairRoom/CategoryManagementModal/CategoryManagementModal';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import Footer from '@/components/PairRoom/ReferenceCard/Footer/Footer';
import Header from '@/components/PairRoom/ReferenceCard/Header/Header';
import ReferenceList from '@/components/PairRoom/ReferenceCard/ReferenceList/ReferenceList';

import useModal from '@/hooks/_common/useModal';

import useGetCategories, { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_VALUE } from '@/queries/PairRoom/useGetCategories';
import useGetReferences from '@/queries/PairRoom/useGetReferences';

import { findValueById } from '@/utils/findOption';

import * as S from './ReferenceCard.styles';

interface ReferenceCardProps {
  accessCode: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const ReferenceCard = ({ accessCode, isOpen, toggleIsOpen }: ReferenceCardProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(DEFAULT_CATEGORY_ID);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { categories, isCategoryExist } = useGetCategories(accessCode);
  const { references } = useGetReferences(selectedCategoryId, accessCode);

  const selectedCategoryName = findValueById(categories, selectedCategoryId) || DEFAULT_CATEGORY_VALUE;

  return (
    <S.Layout>
      <PairRoomCard>
        <Header
          isOpen={isOpen}
          selectedCategoryName={selectedCategoryName}
          toggleIsOpen={toggleIsOpen}
          onButtonClick={openModal}
        />
        <S.Body $isOpen={isOpen}>
          <ReferenceList references={references || []} accessCode={accessCode} />
          <Footer accessCode={accessCode} categories={categories} />
        </S.Body>
      </PairRoomCard>
      <CategoryManagementModal
        accessCode={accessCode}
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
