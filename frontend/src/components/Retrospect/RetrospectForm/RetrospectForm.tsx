import { useLocation } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import RetrospectContent from '@/components/Retrospect/RetrospectContent/RetrospectContent';
import RetrospectHeader from '@/components/Retrospect/RetrospectHeader/RetrospectHeader';

import useInputAnswer from '@/hooks/Retrospect/const useInputAnswer';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

import * as S from './RetrospectForm.styles';

const RetrospectForm = () => {
  const location = useLocation();
  const pairRoomAccessCode = location.state.accessCode;

  const { answers, handleChange, hasEmptyField, handleSubmit } = useInputAnswer(pairRoomAccessCode);

  return (
    <>
      <RetrospectHeader readOnly={false} accessCode={pairRoomAccessCode} />
      <S.LayoutForm onSubmit={handleSubmit}>
        <RetrospectContent
          questions={RETROSPECT_QUESTIONS}
          answers={answers}
          readOnly={false}
          onChange={handleChange}
        />
        <Button disabled={hasEmptyField()} type="submit" css={S.SubmitButton}>
          작성 완료
        </Button>
      </S.LayoutForm>
    </>
  );
};

export default RetrospectForm;
