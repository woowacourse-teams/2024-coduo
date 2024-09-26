import CategoryItem from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/CategoriesEditor/CategoryItem/CategoryItem';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import * as S from './CategoriesEditor.styles';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  handleSelectCategory: (categoryId: string) => void;
  accessCode: string;
  closeModal: () => void;
}

const CategoriesEditor = ({
  closeModal,
  accessCode,
  categories,
  selectedCategory,
  handleSelectCategory,
}: CategoryFilterProps) => {
  return (
    <S.CategoryList>
      {categories.map((category) => (
        <CategoryItem
          closeModal={closeModal}
          accessCode={accessCode}
          key={category.id}
          categoryName={category.value}
          categoryId={category.id}
          isChecked={category.id === selectedCategory}
          handleSelectCategory={handleSelectCategory}
        />
      ))}
    </S.CategoryList>
  );
};

export default CategoriesEditor;
