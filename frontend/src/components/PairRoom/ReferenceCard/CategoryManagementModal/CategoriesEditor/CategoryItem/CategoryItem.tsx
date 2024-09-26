import Input from '@/components/common/Input/Input';
import { Message } from '@/components/common/Input/Input.styles';
import IconButton from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/CategoriesEditor/CategoryItem/IconButton/IconButton';
import ReadonlyCategoryItem from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/CategoriesEditor/CategoryItem/ReadonlyCategoryItem/ReadonlyCategoryItem';

import { DEFAULT_CATEGORY_ID } from '@/hooks/PairRoom/useCategories';
import useEditCategory from '@/hooks/PairRoom/useEditCategory';

import * as S from './CategoryItem.styles';

interface CategoryItemProps {
  accessCode: string;
  categoryName: string;
  categoryId: string;
  isChecked: boolean;
  closeModal: () => void;
  handleSelectCategory: (categoryId: string) => void;
}

const CategoryItem = ({
  closeModal,
  categoryName,
  categoryId,
  isChecked,
  handleSelectCategory,
  accessCode,
}: CategoryItemProps) => {
  const { isEditing, categoryInputData, actions } = useEditCategory(accessCode, categoryName, categoryId);

  const handleUpdateCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    await actions.updateCategory();
  };

  const handleDeleteCategory = async () => {
    await actions.deleteCategory();
    if (isChecked) handleSelectCategory(DEFAULT_CATEGORY_ID);
  };

  return (
    <S.Layout>
      {isEditing ? (
        <S.EditForm onSubmit={handleUpdateCategory}>
          <S.Container>
            <Input
              placeholder="수정할 카테고리 이름을 입력해주세요."
              value={categoryInputData.value}
              onChange={(event) => actions.editCategory(event, categoryName)}
              status={categoryInputData.status}
              height="4.4rem"
              width="28rem"
            />
            {categoryInputData.message && (
              <Message $status={categoryInputData.status}>{categoryInputData.message}</Message>
            )}
          </S.Container>
          <S.CategoryIconsContainer>
            <IconButton type="submit" icon="CHECK" />
            <IconButton onClick={actions.cancelEditing} icon="CANCEL" />
          </S.CategoryIconsContainer>
        </S.EditForm>
      ) : (
        <>
          <S.Container>
            <ReadonlyCategoryItem
              closeModal={closeModal}
              categoryId={categoryId}
              isChecked={isChecked}
              category={categoryName}
              handleSelectCategory={handleSelectCategory}
            />
          </S.Container>
          {categoryId !== DEFAULT_CATEGORY_ID && (
            <S.CategoryIconsContainer>
              <IconButton onClick={actions.startEditing} icon="EDIT" />
              <IconButton onClick={handleDeleteCategory} icon="DELETE" />
            </S.CategoryIconsContainer>
          )}
        </>
      )}
    </S.Layout>
  );
};

export default CategoryItem;
