import { FaFilter } from 'react-icons/fa';

import { Modal } from '@/components/common/Modal';
import CategoryItem from '@/components/CompletedPairRoom/ReferenceCard/CategoryManagementModal/CategoriesEditor/CategoryItem/CategoryItem';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import * as S from './CategoryManagementModal.styles';

interface CategoryManagementModalProps {
  isOpen: boolean;
  closeModal: () => void;
  categories: Category[];
  isCategoryExist: (categoryName: string) => boolean;
  selectedCategory: string;
  handleSelectCategory: (categoryId: string) => void;
}

const CategoryManagementModal = ({
  isOpen,
  closeModal,
  categories,
  selectedCategory,
  handleSelectCategory,
}: CategoryManagementModalProps) => {
  return (
    <Modal isOpen={isOpen} close={closeModal} size="45rem">
      <Modal.Header>
        <S.Header>
          <FaFilter />
          <p>카테고리 선택</p>
        </S.Header>
      </Modal.Header>
      <Modal.CloseButton close={closeModal} />
      <Modal.Body>
        <S.CategoryList>
          {categories.map((category) => (
            <CategoryItem
              closeModal={closeModal}
              key={category.id}
              categoryName={category.value}
              categoryId={category.id}
              isChecked={category.id === selectedCategory}
              handleSelectCategory={handleSelectCategory}
            />
          ))}
        </S.CategoryList>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryManagementModal;
