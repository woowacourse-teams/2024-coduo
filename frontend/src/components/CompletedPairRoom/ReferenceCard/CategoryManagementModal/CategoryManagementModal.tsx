import { FaFilter } from 'react-icons/fa';

import { Modal } from '@/components/common/Modal';
import CategoriesEditor from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/CategoriesEditor/CategoriesEditor';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import * as S from './CategoryManagementModal.styles';

interface CategoryManagementModalProps {
  accessCode: string;
  isOpen: boolean;
  closeModal: () => void;
  categories: Category[];
  isCategoryExist: (categoryName: string) => boolean;
  selectedCategory: string;
  handleSelectCategory: (categoryId: string) => void;
}

const CategoryManagementModal = ({
  accessCode,
  isOpen,
  closeModal,
  categories,
  selectedCategory,
  handleSelectCategory,
}: CategoryManagementModalProps) => {
  const closeCategoryManagementModal = () => {
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} close={closeCategoryManagementModal} size="45rem">
      <Modal.Header>
        <S.Header>
          <FaFilter />
          <p>카테고리 선택</p>
        </S.Header>
      </Modal.Header>
      <Modal.CloseButton close={closeCategoryManagementModal} />
      <Modal.Body>
        <CategoriesEditor
          categories={categories}
          selectedCategory={selectedCategory}
          handleSelectCategory={handleSelectCategory}
          accessCode={accessCode}
          closeModal={closeCategoryManagementModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CategoryManagementModal;
