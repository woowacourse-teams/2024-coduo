import { FaFilter } from 'react-icons/fa';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Message } from '@/components/common/Input/Input.styles';
import { Modal } from '@/components/common/Modal';
import CategoryFilter from '@/components/PairRoom/ReferenceCard/CategoryFilter/CategoryFilter';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useInput from '@/hooks/common/useInput';

import useAddCategory from '@/queries/PairRoom/category/useAddCategory';

import * as S from './CategoryModal.styles';

import { validateCategory } from '@/validations/validateCategory';

interface CategoryModalProps {
  accessCode: string;
  isOpen: boolean;
  closeModal: () => void;
  categories: Category[];
  isCategoryExist: (category: string) => boolean;
  selectedCategory: string;
  handleSelectCategory: (category: string) => void;
}

const CategoryModal = ({
  accessCode,
  isOpen,
  closeModal,
  categories,
  isCategoryExist,
  selectedCategory,
  handleSelectCategory,
}: CategoryModalProps) => {
  const { value, handleChange, resetValue, message, status } = useInput('');

  const { addCategory } = useAddCategory();

  const closeCategoryModal = () => {
    resetValue();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} close={closeCategoryModal} size="45rem">
      <Modal.Header>
        <S.CategoryModalHeader>
          <FaFilter />
          <p>카테고리 선택</p>
        </S.CategoryModalHeader>
      </Modal.Header>
      <Modal.CloseButton close={closeCategoryModal} />
      <Modal.Body>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          handleSelectCategory={handleSelectCategory}
        />
      </Modal.Body>
      <S.AddNewCategoryBox
        onSubmit={(event) => {
          event.preventDefault();
          if (status === 'ERROR') return;
          addCategory({ category: value, accessCode });
          resetValue();
        }}
      >
        <S.AddNewCategoryInputBox>
          <Input
            value={value}
            placeholder="새로운 카테고리를 입력해주세요."
            onChange={(event) => handleChange(event, validateCategory(event.target.value, isCategoryExist))}
            status={status}
            $css={S.inputStyles}
          />
          <Button size="sm" disabled={status === 'ERROR' || value === ''}>
            추가
          </Button>
        </S.AddNewCategoryInputBox>
        <Message $status={status}>{message}</Message>
      </S.AddNewCategoryBox>
    </Modal>
  );
};

export default CategoryModal;
