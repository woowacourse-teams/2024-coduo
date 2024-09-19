import CategoryBox from '@/components/PairRoom/ReferenceCard/CategoryFilter/CategoryBox';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import * as S from './CategoryFilter.styles';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  handleSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, handleSelectCategory }: CategoryFilterProps) => {
  return (
    <S.Categories>
      {categories.length < 1 ? (
        <>
          <p>새로운 카테고리를 추가해주세요!</p>
          <p>카테고리가 없습니다.</p>
        </>
      ) : (
        <>
          <CategoryBox
            key={0}
            category={'전체'}
            isChecked={'전체' === selectedCategory}
            handleSelectCategory={handleSelectCategory}
          />
          {categories.map((category) => (
            <CategoryBox
              key={category.id}
              category={category.value}
              isChecked={category.value === selectedCategory}
              handleSelectCategory={handleSelectCategory}
            />
          ))}
        </>
      )}
    </S.Categories>
  );
};

export default CategoryFilter;
