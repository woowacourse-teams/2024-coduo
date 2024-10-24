import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';
import CategoryItem from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/CategoryItem/CategoryItem';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useInput from '@/hooks/common/useInput';

import { useAddCategory } from '@/queries/PairRoom/category/mutation';

import { validateCategoryName } from '@/validations/validateCategory';

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

  const handleAddCategorySubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (status === 'ERROR') return;

    addCategory.mutateAsync({ category: value, accessCode }).then(() => resetValue());
  };

  const handleCloseModal = () => {
    resetValue();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} close={handleCloseModal} size="50rem">
      <Modal.Header>
        <S.Header>
          <p>카테고리 선택하기</p>
        </S.Header>
      </Modal.Header>
      <Modal.Body>
        <S.CategoryList>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              isChecked={category.id === selectedCategory}
              accessCode={accessCode}
              closeModal={handleCloseModal}
              categoryId={category.id}
              categoryName={category.value}
              handleSelectCategory={handleSelectCategory}
            />
          ))}
        </S.CategoryList>
      </Modal.Body>
      <S.Form onSubmit={handleAddCategorySubmit}>
        <S.InputContainer>
          <Input
            value={value}
            placeholder="추가할 카테고리를 입력해 주세요."
            height="4.4rem"
            status={status}
            message={message}
            onChange={(event) => handleChange(event, validateCategoryName(event.target.value, isCategoryExist))}
          />
          <Button
            $css={S.buttonStyles}
            type="submit"
            size="sm"
            rounded={true}
            disabled={value.trim() === '' || status !== 'DEFAULT'}
          >
            <LuPlus size="1.6rem" />
          </Button>
        </S.InputContainer>
      </S.Form>
      <Modal.CloseButton close={handleCloseModal} />
    </Modal>
  );
};

export default CategoryManagementModal;
