import { CheckBoxChecked, CheckBoxUnchecked } from '@/assets';

import * as S from './ReadonlyCategoryItem.styles';

interface ReadonlyCategoryItemProps {
  isChecked: boolean;
  category: string;
  categoryId: string;
  closeModal: () => void;
  handleSelectCategory: (categoryId: string) => void;
}

const ReadonlyCategoryItem = ({
  closeModal,
  categoryId,
  isChecked,
  category,
  handleSelectCategory,
}: ReadonlyCategoryItemProps) => {
  return (
    <S.Layout
      id={categoryId}
      onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (event.currentTarget.id === '카테고리') return;
        if (isChecked) return;
        handleSelectCategory(event.currentTarget.id);
        closeModal();
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
