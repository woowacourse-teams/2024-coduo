/* eslint-disable jsx-a11y/no-autofocus */
import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';
import Input from '@/components/common/Input/Input';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useToastStore from '@/stores/toastStore';

import useInput from '@/hooks/common/useInput';
import { DEFAULT_CATEGORY_VALUE } from '@/hooks/PairRoom/useCategories';

import { useAddCategory } from '@/queries/PairRoom/category/mutation';

import { validateCategoryName } from '@/validations/validateCategory';

interface CategoryDropdownProps {
  accessCode: string;
  categories: Category[];
  currentCategoryId: string | null;
  handleCurrentCategory: (category: string) => void;
  getCategoryNameById: (categoryId: string) => string;
  isCategoryExist: (categoryName: string) => boolean;
}

const CategoryDropdown = ({
  categories,
  accessCode,
  currentCategoryId,
  handleCurrentCategory,
  getCategoryNameById,
  isCategoryExist,
}: CategoryDropdownProps) => {
  const { addToast } = useToastStore();

  const { value, status, message, handleChange, resetValue } = useInput();

  const { mutateAsync } = useAddCategory();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (status === 'ERROR') {
      addToast({ status, message });
      return;
    }

    mutateAsync({ category: value, accessCode }).then(() => resetValue());
  };

  return (
    <Dropdown
      width="17rem"
      height="4rem"
      direction="upper"
      placeholder="카테고리를 선택해주세요."
      valueOptions={categories}
      selectedOption={getCategoryNameById(currentCategoryId || '') || DEFAULT_CATEGORY_VALUE}
      onSelect={(option) => handleCurrentCategory(option)}
    >
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          placeholder="+ 새 카테고리 추가"
          height="4rem"
          maxLength={15}
          value={value}
          status={status}
          onChange={(event) => handleChange(event, validateCategoryName(event.target.value, isCategoryExist))}
        />
      </form>
    </Dropdown>
  );
};

export default CategoryDropdown;
