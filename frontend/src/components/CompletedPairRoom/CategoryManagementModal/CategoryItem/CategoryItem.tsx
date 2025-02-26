import { CheckBoxChecked, CheckBoxUnchecked } from '@/assets';

import useToastStore from '@/stores/toastStore';

import * as S from './CategoryItem.styles';

interface CategoryItemProps {
  categoryName: string;
  categoryId: string;
  isChecked: boolean;
  closeModal: () => void;
  handleSelectedCategoryId: (categoryId: string) => void;
}

const CategoryItem = ({
  closeModal,
  categoryName,
  categoryId,
  isChecked,
  handleSelectedCategoryId,
}: CategoryItemProps) => {
  const { addToast } = useToastStore();

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isChecked) return;

    handleSelectedCategoryId(event.currentTarget.id);
    addToast({ status: 'SUCCESS', message: `${categoryName}이(가) 선택되었어요.` });
    closeModal();
  };

  return (
    <S.Layout>
      <S.Container id={categoryId} onClick={handleCategoryClick}>
        <img src={isChecked ? CheckBoxChecked : CheckBoxUnchecked} alt={isChecked ? '체크됨' : '체크되지 않음'} />
        <S.Item $isChecked={isChecked}>
          <p>{categoryName}</p>
        </S.Item>
      </S.Container>
    </S.Layout>
  );
};

export default CategoryItem;
