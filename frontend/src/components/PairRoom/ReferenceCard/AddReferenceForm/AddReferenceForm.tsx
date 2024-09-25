import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import CategoryDropdown from '@/components/PairRoom/ReferenceCard/AddReferenceForm/CategoryDropdown/CategoryDropdown';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useInput from '@/hooks/common/useInput';
import useReference from '@/hooks/PairRoom/useReference';

import { formatLink } from '@/utils/Reference/formatLink';

import * as S from './AddReferenceForm.styles';

interface ReferenceFormProps {
  getCategoryNameById: (categoryId: string) => string;
  categories: Category[];
  accessCode: string;
}

const AddReferenceForm = ({ accessCode, categories, getCategoryNameById }: ReferenceFormProps) => {
  const { value, status, message, handleChange, resetValue } = useInput();
  const { currentCategoryId, handleCurrentCategory, handleSubmit } = useReference(accessCode, value, () =>
    resetValue(),
  );

  return (
    <S.Layout>
      <CategoryDropdown
        currentCategoryId={currentCategoryId}
        categories={categories}
        handleCurrentCategory={handleCurrentCategory}
        accessCode={accessCode}
        getCategoryNameById={getCategoryNameById} />
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
