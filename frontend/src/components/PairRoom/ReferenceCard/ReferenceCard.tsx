import { useState } from 'react';

import CategoryManagementModal from '@/components/PairRoom/CategoryManagementModal/CategoryManagementModal';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import Footer from '@/components/PairRoom/ReferenceCard/Footer/Footer';
import Header from '@/components/PairRoom/ReferenceCard/Header/Header';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';
import ReferenceList from '@/components/PairRoom/ReferenceCard/ReferenceList/ReferenceList';

import { Reference } from '@/apis/http/referenceLink';

import useModal from '@/hooks/_common/useModal';

import useCategoriesQuery, { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_VALUE } from '@/queries/PairRoom/useCategoriesQuery';

import { findValueById } from '@/utils/findOption';

import * as S from './ReferenceCard.styles';

interface ReferenceCardProps {
  accessCode: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
  references: Reference[];
  categories: Category[];
}

const ReferenceCard = ({ accessCode, isOpen, toggleIsOpen, references, categories }: ReferenceCardProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(DEFAULT_CATEGORY_ID);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { isCategoryExist } = useCategoriesQuery(accessCode);

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
