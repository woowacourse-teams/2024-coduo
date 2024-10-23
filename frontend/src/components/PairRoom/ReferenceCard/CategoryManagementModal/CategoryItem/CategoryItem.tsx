import { CheckBoxChecked, CheckBoxUnchecked } from '@/assets';

import Input from '@/components/common/Input/Input';
import IconButton from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/IconButton/IconButton';

import { DEFAULT_CATEGORY_ID } from '@/hooks/PairRoom/useCategories';
import useEditCategory from '@/hooks/PairRoom/useEditCategory';

import * as S from './CategoryItem.styles';

interface CategoryItemProps {
  accessCode: string;
  categoryId: string;
  categoryName: string;
  isChecked: boolean;
  closeModal: () => void;
  handleSelectCategory: (categoryId: string) => void;
}

const CategoryItem = ({
  accessCode,
  categoryId,
  categoryName,
  isChecked,
  closeModal,
  handleSelectCategory,
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

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (event.currentTarget.id === '카테고리' || isChecked) return;
    handleSelectCategory(event.currentTarget.id);
    closeModal();
  };

  if (isEditing) {
    return (
      <form onSubmit={handleUpdateCategory}>
        <S.Layout>
          <Input
            height="4.4rem"
            placeholder="수정할 카테고리 이름을 입력해주세요."
            value={categoryInputData.value}
            onChange={(event) => actions.editCategory(event, categoryName)}
            status={categoryInputData.status}
            message={categoryInputData.message}
          />
          <S.IconContainer>
            <IconButton icon="CHECK" type="submit" />
            <IconButton icon="CANCEL" onClick={actions.cancelEditing} />
          </S.IconContainer>
        </S.Layout>
      </form>
    );
  }

  return (
    <S.Layout>
      <S.Container id={categoryId} onClick={handleCategoryClick}>
        <img src={isChecked ? CheckBoxChecked : CheckBoxUnchecked} alt={isChecked ? '체크됨' : '체크되지 않음'} />
        <S.Item $isChecked={isChecked}>
          <p>{categoryName}</p>
        </S.Item>
      </S.Container>
      {categoryId !== DEFAULT_CATEGORY_ID && (
        <S.IconContainer>
          <IconButton onClick={actions.startEditing} icon="EDIT" />
          <IconButton onClick={handleDeleteCategory} icon="DELETE" />
        </S.IconContainer>
      )}
    </S.Layout>
  );
};

export default CategoryItem;
