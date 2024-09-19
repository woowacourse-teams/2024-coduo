/* eslint-disable jsx-a11y/no-autofocus */

import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';
import Input from '@/components/common/Input/Input';

import useInput from '@/hooks/common/useInput';

import useAddCategory from '@/queries/PairRoom/category/useAddCategory';

interface CategoryDropdownProp {
  categories: string[];
  accessCode: string;
  currentCategory: string | null;
  handleCurrentCategory: (category: string | null) => void;
}

const CategoryDropdown = ({ categories, accessCode, currentCategory, handleCurrentCategory }: CategoryDropdownProp) => {
  const { value, status, handleChange, resetValue } = useInput();
  const { addCategory } = useAddCategory(() => resetValue());
  const newCategories = [...categories, '카테고리 없음'];
  const handleCategory = (option: string | null) => {
    handleCurrentCategory(option);
  };
  return (
    <>
      <Dropdown
        width="17rem"
        height="4rem"
        direction="upper"
        placeholder="카테고리를 선택해주세요."
        options={newCategories}
        selectedOption={currentCategory || '카테고리 없음'}
        onSelect={(option) => handleCategory(option)}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (status === 'ERROR') return;
            addCategory({ category: value, accessCode });
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
