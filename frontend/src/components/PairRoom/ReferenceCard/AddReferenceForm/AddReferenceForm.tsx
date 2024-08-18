import { useState } from 'react';

import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';
import Input from '@/components/common/Input/Input';

import useInput from '@/hooks/common/useInput';

import * as S from './AddReferenceForm.styles';

interface ReferenceFormProps {
  handleAddReferenceLink: (value: string, category: string | null) => void;
  categories: string[];
}
const AddReferenceForm = ({ categories, handleAddReferenceLink }: ReferenceFormProps) => {
  const { value, status, message, handleChange, resetValue } = useInput();
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const category = currentCategory === '카테고리 없음' ? null : currentCategory;
    handleAddReferenceLink(value, category);

    resetValue();
  };
  const handleCategory = (option: string | null) => {
    setCurrentCategory(option);
  };
  //categories 에 '카테고리 없음' 추가하기

  const newCategories = [...categories, '카테고리 없음'];

  return (
    <>
      {isFooterOpen ? (
        <S.ReferenceFormContainer>
          <Dropdown
            height=""
            width="17rem"
            options={newCategories}
            defaultOption="카테고리 없음"
            placeholder="카테고리를 선택해주세요."
            onSelect={(option) => handleCategory(option)}
            direction="upper"
          />
          <S.Form onSubmit={handleSubmit}>
            <Input
              $css={S.inputStyles}
              placeholder="링크를 입력해주세요."
              value={value}
              status={status}
              message={message}
              onChange={handleChange}
            />
            <S.ButtonContainer>
              <Button type="button" size="sm" filled={false} rounded={true} onClick={() => setIsFooterOpen(false)}>
                취소
              </Button>
              <Button type="submit" size="sm" rounded={true} disabled={value === '' || status !== 'DEFAULT'}>
                확인
              </Button>
            </S.ButtonContainer>
          </S.Form>
        </S.ReferenceFormContainer>
      ) : (
        <S.FooterButton onClick={() => setIsFooterOpen(true)}>
          <LuPlus />
          링크 추가하기
        </S.FooterButton>
      )}
    </>
  );
};

export default AddReferenceForm;
