import { useState } from 'react';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import AddReferenceForm from '@/components/PairRoom/ReferenceCard/AddReferenceForm/AddReferenceForm';
import CategoryModal from '@/components/PairRoom/ReferenceCard/CategoryModal/CategoryModal';
import Header from '@/components/PairRoom/ReferenceCard/Header/Header';
import ReferenceList from '@/components/PairRoom/ReferenceCard/ReferenceList/ReferenceList';

import useModal from '@/hooks/common/useModal';

import useGetCategories from '@/queries/PairRoom/category/useGetCategories';
import useReferenceLinks from '@/queries/PairRoom/useReferenceLinks';

import * as S from './ReferenceCard.styles';

interface ReferenceCardProps {
  accessCode: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const ReferenceCard = ({ accessCode, isOpen, toggleIsOpen }: ReferenceCardProps) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const { isModalOpen, openModal, closeModal } = useModal();

  const { categories, categoryRecord, isCategoryExist } = useGetCategories(accessCode);
  const { referenceLinks, handleAddReferenceLink, handleDeleteReferenceLink } = useReferenceLinks(
    accessCode,
    selectedCategory,
  );

  return (
    <>
      <S.Layout>
        <PairRoomCard>
          <Header
            isOpen={isOpen}
            selectedCategory={selectedCategory}
            toggleIsOpen={toggleIsOpen}
            onButtonClick={openModal}
          />
          <S.Body $isOpen={isOpen}>
            <ReferenceList referenceLinks={referenceLinks} onDeleteReferenceLink={handleDeleteReferenceLink} />
            <S.Footer>
              <AddReferenceForm categories={categories} handleAddReferenceLink={handleAddReferenceLink} />
            </S.Footer>
          </S.Body>
        </PairRoomCard>
      </S.Layout>
      <CategoryModal
        accessCode={accessCode}
        isOpen={isModalOpen}
        closeModal={closeModal}
        categories={categoryRecord}
        isCategoryExist={isCategoryExist}
        selectedCategory={selectedCategory}
        handleSelectCategory={(category: string) => setSelectedCategory(category)}
      />
    </>
  );
};

export default ReferenceCard;
