import { useState } from 'react';

import { LuPlus } from 'react-icons/lu';

import Button from '@/components/_common/Button/Button';
import { Dropdown } from '@/components/_common/Dropdown';
import Input from '@/components/_common/InputField/Input/Input';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useInput from '@/hooks/_common/useInput';

import { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_VALUE } from '@/queries/PairRoom/useCategoriesQuery';
import useReferencesMutation from '@/queries/PairRoom/useReferencesMutation';

import { findValueById } from '@/utils/findOption';
import { formatLink } from '@/utils/formatLink';

import * as S from './Footer.styles';

interface FooterProps {
  accessCode: string;
  categories: Category[];
}

const Footer = ({ accessCode, categories }: FooterProps) => {
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);

  const { value, status, handleChange, resetValue } = useInput();

  const { addReferenceMutation } = useReferencesMutation();

  const handleCurrentCategoryId = (categoryId: string | null) => setCurrentCategoryId(categoryId);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const url = formatLink(value);
    const categoryId = currentCategoryId === DEFAULT_CATEGORY_ID ? null : currentCategoryId;

    addReferenceMutation({ url, accessCode, categoryId }, { onSuccess: resetValue });
  };

  return (
    <S.Footer>
      <Dropdown
        width="17rem"
        height="4rem"
        gap="4.6rem"
        direction="UPPER"
        placeholder="카테고리를 선택해 주세요."
        options={categories}
        selectedOption={findValueById(categories, currentCategoryId || '') || DEFAULT_CATEGORY_VALUE}
        onSelect={(option) => handleCurrentCategoryId(option)}
      />
      <S.Form onSubmit={handleSubmit}>
        <Input
          height="4rem"
          borderRadius="0.6rem"
          placeholder="링크를 입력해주세요."
          value={value}
          status={status}
          onChange={handleChange}
        />
        <Button
          width="4.4rem"
          height="4rem"
          borderRadius="0.6rem"
          type="submit"
          aria-label="링크 추가하기 버튼"
          rounded={true}
          disabled={value.trim() === '' || status !== 'DEFAULT'}
        >
          <LuPlus size="1.6rem" role="presentation" />
        </Button>
      </S.Form>
    </S.Footer>
  );
};

export default Footer;
