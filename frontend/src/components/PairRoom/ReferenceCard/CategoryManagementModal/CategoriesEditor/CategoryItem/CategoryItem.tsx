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
  handleSelectCategory: (categoryId: string) => void;
}

const CategoryItem = ({ categoryName, categoryId, isChecked, handleSelectCategory, accessCode }: CategoryItemProps) => {
  const { isEditing, categoryInputData, actions } = useEditCategory(accessCode, categoryName, categoryId);

  const handleUpdateCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    await actions.updateCategory();
  };

  const handleDeleteCategory = () => {
    actions.deleteCategory();
    if (isChecked) handleSelectCategory(DEFAULT_CATEGORY_ID);
  };

  return (
    <S.Layout>
      <S.Container>
        {isEditing ? (
          <S.EditForm onSubmit={handleUpdateCategory}>
            <Input
              placeholder="수정할 카테고리 이름을 입력해주세요."
              value={categoryInputData.value}
              onChange={actions.editCategory}
              status={categoryInputData.status}
            />
            {categoryInputData.message && (
              <Message $status={categoryInputData.status}>{categoryInputData.message}</Message>
            )}
          </S.EditForm>
        ) : (
          <ReadonlyCategoryItem
            categoryId={categoryId}
            isChecked={isChecked}
            category={categoryName}
            handleSelectCategory={handleSelectCategory}
          />
        )}

        <S.CategoryIconsContainer>
          {isEditing ? (
            <>
              <IconButton icon="CHECK" />
              <IconButton onClick={actions.cancelEditing} icon="CANCEL" />
            </>
          ) : (
            <>
              {categoryId !== DEFAULT_CATEGORY_ID && (
                <>
                  <IconButton onClick={actions.startEditing} icon="EDIT" />
                  <IconButton onClick={handleDeleteCategory} icon="DELETE" />
                </>
              )}
            </>
          )}
        </S.CategoryIconsContainer>
      </S.Container>
    </S.Layout>
  );
};

export default CategoryItem;
