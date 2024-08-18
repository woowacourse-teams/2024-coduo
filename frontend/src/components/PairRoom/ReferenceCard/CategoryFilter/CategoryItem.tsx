import * as S from './CategoryFilter.styles';

import { CheckBoxChecked, CheckBoxUnchecked } from '@/assets';

interface CategoryItemProps {
  isChecked: boolean;
  category: string;
  handleSelectCategory: (category: string) => void;
  id: string;
}

const CategoryItem = ({ id, isChecked, category, handleSelectCategory }: CategoryItemProps) => {
  return (
    <S.CategoryItemContainer
      id={id}
      onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        handleSelectCategory(event.currentTarget.id);
      }}
    >
      <img
        src={isChecked ? CheckBoxChecked : CheckBoxUnchecked}
        alt={isChecked ? '체크된 체크박스' : '체크되지 않은 체크박스'}
      />

      <S.Category $isChecked={isChecked}>
        <p>{category}</p>
      </S.Category>
    </S.CategoryItemContainer>
  );
};
export default CategoryItem;
