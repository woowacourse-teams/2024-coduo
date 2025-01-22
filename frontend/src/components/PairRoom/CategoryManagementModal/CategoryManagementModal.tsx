import { ChangeEvent } from 'react';

import { LuPlus } from 'react-icons/lu';

import Button from '@/components/_common/Button/Button';
import { InputField } from '@/components/_common/InputField';
import { Modal } from '@/components/_common/Modal';
import CategoryItem from '@/components/PairRoom/CategoryManagementModal/CategoryItem/CategoryItem';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useInput from '@/hooks/_common/useInput';

import useCategoriesMutation from '@/queries/PairRoom/useCategoriesMutation';

import { validateCategoryName } from '@/validations/validateCategory';

import { theme } from '@/styles/theme';

import * as S from './CategoryManagementModal.styles';

interface CategoryManagementModalProps {
  accessCode: string;
  isOpen: boolean;
  closeModal: () => void;
  categories: Category[];
  isCategoryExist: (categoryName: string) => boolean;
  selectedCategoryId: string;
  handleSelectedCategoryId: (categoryId: string) => void;
}

const CategoryManagementModal = ({
  accessCode,
  isOpen,
  closeModal,
  categories,
  isCategoryExist,
  selectedCategoryId,
  handleSelectedCategoryId,
}: CategoryManagementModalProps) => {
  const { value, handleChange, resetValue, message, status } = useInput('');

  const { addCategoryMutation } = useCategoriesMutation();

  const handleAddCategorySubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (status === 'ERROR') return;

    addCategoryMutation({ category: value, accessCode }, { onSuccess: resetValue });
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
              isChecked={category.id === selectedCategoryId}
              accessCode={accessCode}
              closeModal={handleCloseModal}
              categoryId={category.id}
              categoryName={category.value}
              handleSelectCategory={handleSelectedCategoryId}
            />
          ))}
        </S.CategoryList>
      </Modal.Body>
      <S.Form onSubmit={handleAddCategorySubmit}>
        <InputField gap="0.5rem">
          <InputField.Content>
            <InputField.Input
              value={value}
              placeholder="추가할 카테고리를 입력해 주세요."
              height="4.4rem"
              status={status}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChange(event, validateCategoryName(event.target.value, isCategoryExist))
              }
            ></InputField.Input>
            <Button
              type="submit"
              width="4.8rem"
              height="4.4rem"
              fontSize={theme.fontSize.lg}
              rounded={true}
              disabled={value.trim() === '' || status !== 'DEFAULT'}
            >
              <LuPlus size="1.6rem" />
            </Button>
          </InputField.Content>
          <InputField.Message status={status}>{message}</InputField.Message>
        </InputField>
      </S.Form>
      <Modal.CloseButton close={handleCloseModal} />
    </Modal>
  );
};

export default CategoryManagementModal;
