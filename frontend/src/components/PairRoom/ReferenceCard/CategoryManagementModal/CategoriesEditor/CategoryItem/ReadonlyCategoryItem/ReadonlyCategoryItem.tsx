import * as S from './ReadonlyCategoryItem.styles';

import { CheckBoxChecked, CheckBoxUnchecked } from '@/assets';

interface ReadonlyCategoryItemProps {
  isChecked: boolean;
  category: string;
  categoryId: string;
  handleSelectCategory: (categoryId: string) => void;
}

const ReadonlyCategoryItem = ({ categoryId, isChecked, category, handleSelectCategory }: ReadonlyCategoryItemProps) => {
  return (
    <S.Layout
      id={categoryId}
      onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        handleSelectCategory(event.currentTarget.id);
      }}
    >
      <img
        src={isChecked ? CheckBoxChecked : CheckBoxUnchecked}
        alt={isChecked ? '체크된 체크박스' : '체크되지 않은 체크박스'}
      />

      <S.ReadonlyCategoryItem $isChecked={isChecked}>
        <p>{category}</p>
      </S.ReadonlyCategoryItem>
    </S.Layout>
  );
};
export default ReadonlyCategoryItem;
