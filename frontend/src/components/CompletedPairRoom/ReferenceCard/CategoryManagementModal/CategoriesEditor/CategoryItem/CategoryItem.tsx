import ReadonlyCategoryItem from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/CategoriesEditor/CategoryItem/ReadonlyCategoryItem/ReadonlyCategoryItem';

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
        <ReadonlyCategoryItem
          closeModal={closeModal}
          categoryId={categoryId}
          isChecked={isChecked}
          category={categoryName}
          handleSelectCategory={handleSelectCategory}
        />
      </S.Container>
    </S.Layout>
  );
};

export default CategoryItem;
