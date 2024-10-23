import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';
import CategoryItem from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/CategoryItem/CategoryItem';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useInput from '@/hooks/common/useInput';

import { useAddCategory } from '@/queries/PairRoom/category/mutation';

import { validateCategory } from '@/validations/validateCategory';

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
    <Modal isOpen={isOpen} close={closeCategoryManagementModal} size="50rem">
      <Modal.Header>
        <S.Header>
          <p>카테고리 선택하기</p>
        </S.Header>
      </Modal.Header>
      <Modal.CloseButton close={closeCategoryManagementModal} />
      <Modal.Body>
        <S.CategoryList>
          {categories.map((category) => (
            <CategoryItem
              closeModal={closeModal}
              accessCode={accessCode}
              key={category.id}
              categoryName={category.value}
              categoryId={category.id}
              isChecked={category.id === selectedCategory}
              handleSelectCategory={handleSelectCategory}
            />
          ))}
        </S.CategoryList>
      </Modal.Body>
      <S.Footer onSubmit={handleAddCategorySubmit}>
        <S.AddNewCategoryInput>
          <Input
            value={value}
            placeholder="+ 새로운 카테고리를 입력해주세요."
            height="4rem"
            onChange={(event) => handleChange(event, validateCategory(event.target.value, isCategoryExist))}
            status={status}
            message={message}
            $css={S.inputStyles}
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
        </S.AddNewCategoryInput>
      </S.Footer>
    </Modal>
  );
};

export default CategoryManagementModal;
