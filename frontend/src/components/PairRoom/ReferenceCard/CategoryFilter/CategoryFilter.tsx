import CategoryBox from '@/components/PairRoom/ReferenceCard/CategoryFilter/CategoryBox';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import * as S from './CategoryFilter.styles';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  handleSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, handleSelectCategory }: CategoryFilterProps) => {
  const newCategories = [...categories, { id: 0, value: '전체' }];

  return (
    <S.Categories>
      {newCategories.map((category) => (
        <CategoryBox
          key={category.id}
          category={category.value}
          isChecked={category.value === selectedCategory}
          handleSelectCategory={handleSelectCategory}
        />
      ))}
    </S.Categories>
  );
};

export default CategoryFilter;
