import { FaFilter } from 'react-icons/fa';
import { LuPlus } from 'react-icons/lu';

import { validateCategory } from '@/validations/validateCategory';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Message } from '@/components/common/Input/Input.styles';
import { Modal } from '@/components/common/Modal';
import CategoriesEditor from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/CategoriesEditor/CategoriesEditor';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useInput from '@/hooks/common/useInput';

import { useAddCategory } from '@/queries/PairRoom/category/mutation';

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
  isCategoryExist,
  selectedCategory,
  handleSelectCategory,
}: CategoryManagementModalProps) => {
  const { value, handleChange, resetValue, message, status } = useInput('');
  const addCategory = useAddCategory();

  const closeCategoryManagementModal = () => {
    resetValue();
    closeModal();
  };

  const handleAddCategorySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (status === 'ERROR') return;
    addCategory.mutateAsync({ category: value, accessCode }).then(() => resetValue());
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

      <S.Footer onSubmit={handleAddCategorySubmit}>
        <S.AddNewCategoryInput>
          <Input
            value={value}
            placeholder="+ 새로운 카테고리를 입력해주세요."
            onChange={(event) => handleChange(event, validateCategory(event.target.value, isCategoryExist))}
            status={status}
            $css={S.inputStyles}
          />
          <Button
            css={S.buttonStyles}
            type="submit"
            size="sm"
            rounded={true}
            disabled={value === '' || status !== 'DEFAULT'}
          >
            <LuPlus size="1.6rem" />
          </Button>
        </S.AddNewCategoryInput>
        <Message $status={status}>{message}</Message>
      </S.Footer>
    </Modal>
  );
};

export default CategoryManagementModal;
