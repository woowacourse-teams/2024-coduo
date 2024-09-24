/* eslint-disable jsx-a11y/no-autofocus */

import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';
import Input from '@/components/common/Input/Input';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useInput from '@/hooks/common/useInput';
import { DEFAULT_CATEGORY_VALUE } from '@/hooks/PairRoom/useCategories';

import { useAddCategory } from '@/queries/PairRoom/category/mutation';

interface CategoryDropdownProp {
  categories: Category[];
  accessCode: string;
  currentCategoryId: string | null;
  handleCurrentCategory: (category: string) => void;
  getCategoryNameById: (categoryId: string) => string;
}

const CategoryDropdown = ({
  categories,
  accessCode,
  currentCategoryId,
  handleCurrentCategory,
  getCategoryNameById,
}: CategoryDropdownProp) => {
  const { value, status, handleChange, resetValue } = useInput();

  const addCategory = useAddCategory().mutateAsync;
  const handleCategory = (option: string) => {
    handleCurrentCategory(option);
  };
  return (
    <>
      <Dropdown
        width="17rem"
        height="4rem"
        direction="upper"
        placeholder="카테고리를 선택해주세요."
        valueOptions={categories}
        selectedOption={ getCategoryNameById(currentCategoryId||"") || DEFAULT_CATEGORY_VALUE}
        onSelect={(option) => handleCategory(option)}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (status === 'ERROR') return;
            addCategory({ category: value, accessCode }).then(() => resetValue());
          }}
        >
          <Input
            value={value}
            onChange={handleChange}
            maxLength={15}
            height="4rem"
            placeholder="새 카테고리 추가하기"
            autoFocus
          />
        </form>
      </Dropdown>
    </>
  );
};

export default CategoryDropdown;
