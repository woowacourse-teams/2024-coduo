import CategoryItem from '@/components/PairRoom/ReferenceCard/CategoryManagementModal/CategoriesEditor/CategoryItem/CategoryItem';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import * as S from './CategoriesEditor.styles';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  handleSelectCategory: (categoryId: string) => void;
  accessCode: string;
}

const MIN_CATEGORY_NUMBER = 2;

const CategoriesEditor = ({ accessCode, categories, selectedCategory, handleSelectCategory }: CategoryFilterProps) => {
  return (
    <S.CategoryList>
      {categories.length < MIN_CATEGORY_NUMBER ? (
        <>
          <p>새로운 카테고리를 추가해주세요!</p>
          <p>카테고리가 없습니다.</p>
        </>
      ) : (
        <>
          {categories.map((category) => (
            <CategoryItem
              accessCode={accessCode}
              key={category.id}
              categoryName={category.value}
              categoryId={category.id}
              isChecked={category.id === selectedCategory}
              handleSelectCategory={handleSelectCategory}
            />
          ))}
        </>
      )}
    </S.CategoryList>
  );
};

export default CategoriesEditor;
