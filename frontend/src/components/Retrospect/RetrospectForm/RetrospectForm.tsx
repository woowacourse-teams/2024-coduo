import { useLocation } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Question from '@/components/Retrospect/Question/Question';
import SkipModal from '@/components/Retrospect/RetrospectForm/SkipModal/SkipModal';
import RetrospectHeader from '@/components/Retrospect/RetrospectHeader/RetrospectHeader';

import useModal from '@/hooks/common/useModal';
import usePreventPageRefresh from '@/hooks/common/usePreventPageRefresh';
import useInputAnswer from '@/hooks/Retrospect/useInputAnswer';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

import * as S from './RetrospectForm.styles';

const RetrospectForm = () => {
  const location = useLocation();
  const accessCode = location.state.accessCode;

  const { answer, handleChange, hasEmptyField, handleSubmit } = useInputAnswer(accessCode);

  const { isModalOpen, openModal, closeModal } = useModal();

  usePreventPageRefresh();
  return (
    <>
      <RetrospectHeader readOnly={false} accessCode={accessCode} onClick={openModal} />
      <S.LayoutForm onSubmit={handleSubmit}>
        {RETROSPECT_QUESTIONS.map((question, index) => (
          <Question key={question.id} id={question.id} question={question.value}>
            <S.Textarea
              key={question.id}
              placeholder="질문에 대한 답변을 작성해주세요."
              id={question.id}
              value={answer[index]}
              onChange={(event) => handleChange(index, event.target.value)}
            />
          </Question>
        ))}

        <Button disabled={hasEmptyField()} type="submit" css={S.SubmitButton}>
          작성 완료
        </Button>
      </S.LayoutForm>
      <SkipModal isModalOpen={isModalOpen} closeModal={closeModal} accessCode={accessCode} />
    </>
  );
};

export default RetrospectForm;
