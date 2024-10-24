import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import CategoryDropdown from '@/components/PairRoom/ReferenceCard/CategoryDropdown/CategoryDropdown';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useInput from '@/hooks/common/useInput';
import useReference from '@/hooks/PairRoom/useReference';

import * as S from './AddReferenceForm.styles';

interface ReferenceFormProps {
  categories: Category[];
  accessCode: string;
  isCategoryExist: (categoryName: string) => boolean;
  getCategoryNameById: (categoryId: string) => string;
}

const AddReferenceForm = ({ accessCode, categories, isCategoryExist, getCategoryNameById }: ReferenceFormProps) => {
  const { value, status, message, handleChange, resetValue } = useInput();
  const { currentCategoryId, handleCurrentCategory, handleSubmit } = useReference(accessCode, value, () =>
    resetValue(),
  );

  return (
    <S.Layout>
      <CategoryDropdown
        accessCode={accessCode}
        categories={categories}
        currentCategoryId={currentCategoryId}
        handleCurrentCategory={handleCurrentCategory}
        getCategoryNameById={getCategoryNameById}
        isCategoryExist={isCategoryExist}
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
        <Button
          $css={S.buttonStyles}
          aria-label="링크 추가하기 버튼"
          type="submit"
          size="sm"
          rounded={true}
          disabled={value.trim() === '' || status !== 'DEFAULT'}
        >
          <LuPlus size="1.6rem" role="presentation" />
        </Button>
      </S.Form>
    </S.Layout>
  );
};

export default AddReferenceForm;
