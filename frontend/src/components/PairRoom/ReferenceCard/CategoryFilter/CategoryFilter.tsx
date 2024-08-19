import Category from '@/components/PairRoom/ReferenceCard/CategoryFilter/CategoryBox';

import * as S from './CategoryFilter.styles';

interface CategoryRecord {
  value: string;
  id: string;
}
interface CategoryFilterProps {
  categories: CategoryRecord[];
  selectedCategory: string;
  handleSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, handleSelectCategory }: CategoryFilterProps) => {
  const isChecked = (category: string) => category === selectedCategory;
  const newCategories = [...categories, { id: 0, value: '전체' }];
  return (
    <S.Categories>
      {newCategories.map((category) => (
        <Category
          key={category.id}
          category={category.value}
          isChecked={isChecked(category.value)}
          handleSelectCategory={handleSelectCategory}
        />
      ))}
    </S.Categories>
  );
};

export default CategoryFilter;
