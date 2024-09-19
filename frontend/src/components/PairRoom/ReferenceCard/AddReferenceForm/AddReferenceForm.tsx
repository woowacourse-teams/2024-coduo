import { useState } from 'react';

import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import CategoryDropdown from '@/components/PairRoom/ReferenceCard/AddReferenceForm/CategoryDropdown';

import useInput from '@/hooks/common/useInput';

import * as S from './AddReferenceForm.styles';

interface ReferenceFormProps {
  handleAddReferenceLink: (value: string, category: string | null) => void;
  categories: string[];
  accessCode: string;
}
const AddReferenceForm = ({ accessCode, categories, handleAddReferenceLink }: ReferenceFormProps) => {
  const { value, status, message, handleChange, resetValue } = useInput();
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const handleCurrentCategory = (category: string | null) => setCurrentCategory(category);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const category = currentCategory === '카테고리 없음' ? null : currentCategory;
    handleAddReferenceLink(value, category);

    resetValue();
  };

  const handleLinkFormat = (link: string): string => {
    if (!link) {
      return '';
    }

    const trimmedLink = link.trim();

    if (trimmedLink.startsWith('http://') || trimmedLink.startsWith('https://')) {
      return trimmedLink;
    }

    if (trimmedLink.startsWith('http:') || trimmedLink.startsWith('https:')) {
      return trimmedLink + '/';
    }
    if (trimmedLink.startsWith('http:') || trimmedLink.startsWith('https:')) {
      return trimmedLink + '//';
    }

    return `https://${trimmedLink}`;
  };

  return (
    <S.Layout>
      <CategoryDropdown
        currentCategory={currentCategory}
        categories={categories}
        handleCurrentCategory={handleCurrentCategory}
        accessCode={accessCode}
      ></CategoryDropdown>
      <S.Form onSubmit={handleSubmit}>
        <Input
          $css={S.inputStyles}
          placeholder="링크를 입력해주세요."
          value={handleLinkFormat(value)}
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
