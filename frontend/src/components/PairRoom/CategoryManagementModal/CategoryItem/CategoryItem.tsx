import { LuArrowLeft, LuPencil, LuTrash2 } from 'react-icons/lu';

import { CheckBoxChecked, CheckBoxUnchecked } from '@/assets';

import IconButton from '@/components/_common/IconButton/IconButton';
import Input from '@/components/_common/InputField/Input/Input';

import useToastStore from '@/stores/toastStore';

import useEditCategory from '@/hooks/PairRoom/useEditCategory';

import { DEFAULT_CATEGORY_ID } from '@/queries/PairRoom/useCategoriesQuery';

import { theme } from '@/styles/theme';

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
  const {
    newCategoryName,
    handleCategoryName,
    isEditing,
    startEditing,
    stopEditing,
    updateCategoryName,
    deleteCategoryName,
  } = useEditCategory(accessCode, categoryId, categoryName);

  const { addToast } = useToastStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateCategoryName();
  };

  const handleDeleteCategory = async () => {
    await deleteCategoryName();
    if (isChecked) handleSelectCategory(DEFAULT_CATEGORY_ID);
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isChecked) return;

    handleSelectCategory(event.currentTarget.id);
    addToast({ status: 'SUCCESS', message: `${categoryName}가 선택되었어요.` });
    closeModal();
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <S.Layout>
          <Input
            height="4.4rem"
            placeholder="수정할 카테고리 이름을 입력해 주세요."
            value={newCategoryName.value}
            status={newCategoryName.status}
            onChange={(event) => handleCategoryName(event, categoryName)}
          />
          <S.IconContainer>
            <IconButton icon={<LuPencil />} color={theme.color.primary[800]} type="submit" size="md" />
            <IconButton icon={<LuArrowLeft />} color={theme.color.primary[800]} onClick={stopEditing} size="md" />
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
          <IconButton onClick={startEditing} icon={<LuPencil />} color={theme.color.primary[800]} size="md" />
          <IconButton onClick={handleDeleteCategory} icon={<LuTrash2 />} color={theme.color.danger[500]} size="md" />
        </S.IconContainer>
      )}
    </S.Layout>
  );
};

export default CategoryItem;
