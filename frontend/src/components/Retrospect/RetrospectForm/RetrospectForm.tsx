import { useLocation } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Question from '@/components/Retrospect/Question/Question';
import SkipModal from '@/components/Retrospect/RetrospectForm/SkipModal/SkipModal';
import TextArea from '@/components/Retrospect/RetrospectForm/Textarea/Textarea';
import RetrospectHeader from '@/components/Retrospect/RetrospectHeader/RetrospectHeader';

import useModal from '@/hooks/common/useModal';
import usePreventPageRefresh from '@/hooks/common/usePreventPageRefresh';
import useInputAnswer from '@/hooks/Retrospect/useInputAnswer';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

import * as S from './RetrospectForm.styles';

const RetrospectForm = () => {
  const location = useLocation();
  const accessCode = location.state.accessCode;

  const { answers, handleChange, handleSubmit } = useInputAnswer(accessCode);

  const { isModalOpen, openModal, closeModal } = useModal();

  usePreventPageRefresh();
  return (
    <>
      <RetrospectHeader readOnly={false} accessCode={accessCode} onClick={openModal} />
      <S.LayoutForm onSubmit={handleSubmit}>
        {RETROSPECT_QUESTIONS.map((question, index) => (
          <Question key={question.id} id={question.id} title={question.title} subtitle={question.subtitle}>
            <TextArea
              key={question.id}
              id={question.id}
              value={answers[index]}
              onChange={(event) => handleChange(index, event.target.value)}
              placeholder="질문에 대한 답변을 작성해주세요."
              charNumber={`${answers[index].length} / 500`}
            />
          </Question>
        ))}

        <Button type="submit" css={S.SubmitButton}>
          작성 완료
        </Button>
      </S.LayoutForm>
      <SkipModal isModalOpen={isModalOpen} closeModal={closeModal} accessCode={accessCode} />
    </>
  );
};

export default RetrospectForm;
