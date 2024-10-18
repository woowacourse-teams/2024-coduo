import { CheckBoxChecked, CheckBoxUnchecked } from '@/assets';

import * as S from './CategoryItem.styles';

interface CategoryItemProps {
  categoryName: string;
  categoryId: string;
  isChecked: boolean;
  closeModal: () => void;
  handleSelectCategory: (categoryId: string) => void;
}

const CategoryItem = ({ closeModal, categoryName, categoryId, isChecked, handleSelectCategory }: CategoryItemProps) => {
  return (
    <S.Layout>
      <S.Container>
        <S.ItemLayout
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

          <S.Item $isChecked={isChecked}>
            <p>{categoryName}</p>
          </S.Item>
        </S.ItemLayout>
      </S.Container>
    </S.Layout>
  );
};

export default CategoryItem;
