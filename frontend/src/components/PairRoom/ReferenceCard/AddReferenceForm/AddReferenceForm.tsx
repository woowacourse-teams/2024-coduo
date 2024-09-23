import { useState } from 'react';

import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import CategoryDropdown from '@/components/PairRoom/ReferenceCard/AddReferenceForm/CategoryDropdown/CategoryDropdown';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useInput from '@/hooks/common/useInput';
import { DEFAULT_CATEGORY_ID } from '@/hooks/PairRoom/useCategories';

import { formatLink } from '@/utils/Reference/formatLink';

import * as S from './AddReferenceForm.styles';

interface ReferenceFormProps {
  handleAddReferenceLink: (value: string, category: string | null) => void;
  getCategoryNameById: (categoryId: string) => string;
  categories: Category[];
  accessCode: string;
}

const AddReferenceForm = ({
  accessCode,
  categories,
  handleAddReferenceLink,
  getCategoryNameById,
}: ReferenceFormProps) => {
  const { value, status, message, handleChange, resetValue } = useInput();
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const handleCurrentCategory = (category: string | null) => setCurrentCategory(category);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const category = currentCategory === DEFAULT_CATEGORY_ID ? null : currentCategory;
    handleAddReferenceLink(value, category);

    resetValue();
  };

  return (
    <S.Layout>
      <CategoryDropdown
        currentCategory={currentCategory}
        categories={categories}
        handleCurrentCategory={handleCurrentCategory}
        accessCode={accessCode}
        getCategoryNameById={getCategoryNameById}
      ></CategoryDropdown>
      <S.Form onSubmit={handleSubmit}>
        <Input
          $css={S.inputStyles}
          placeholder="링크를 입력해주세요."
          value={formatLink(value)}
          status={status}
          message={message}
          onChange={handleChange}
        />
        <Button
          css={S.buttonStyles}
          type="submit"
          size="sm"
          rounded={true}
          disabled={value === '' || status !== 'DEFAULT'}
        >
          <LuPlus size="1.6rem" />
        </Button>
      </S.Form>
    </S.Layout>
  );
};

export default AddReferenceForm;
