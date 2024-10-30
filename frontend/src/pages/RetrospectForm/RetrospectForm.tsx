import { useParams, useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import ConfirmModal from '@/components/_common/ConfirmModal/ConfirmModal';
import Header from '@/components/Retrospect/Header/Header';
import Question from '@/components/Retrospect/Question/Question';
import TextArea from '@/components/Retrospect/Textarea/Textarea';

import usePreventPageRefresh from '@/hooks/_common/customEvent/usePreventPageRefresh';
import useModal from '@/hooks/_common/useModal';
import useInputAnswer from '@/hooks/Retrospect/useInputAnswer';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

import * as S from './RetrospectForm.styles';

const RetrospectForm = () => {
  const navigate = useNavigate();
  const { accessCode } = useParams();

  usePreventPageRefresh();

  const { isModalOpen, openModal, closeModal } = useModal();

  const { answers, handleChange, handleSubmit } = useInputAnswer(accessCode || '');

  const isAnswersEmpty = answers.every((answer) => !answer.trim());

  return (
    <S.Layout>
      <S.Container>
        <Header
          title="회고 작성하기"
          subTitle="지금까지 진행한 페어 프로그래밍에 대한 회고를 작성해 보세요!"
          buttonText="나중에 작성하기"
          onButtonClick={openModal}
        />
        <S.Form onSubmit={handleSubmit}>
          {RETROSPECT_QUESTIONS.map((question, index) => (
            <Question key={question.id} id={question.id} title={question.title} subtitle={question.subtitle}>
              <TextArea
                key={question.id}
                id={question.id}
                value={answers[index]}
                onChange={(event) => handleChange(index, event.target.value)}
                placeholder="질문에 대한 답변을 작성해주세요."
                charNumber={`${answers[index].length} / 1000`}
              />
            </Question>
          ))}
          <S.ButtonContainer>
            <Button width="70%" type="submit" disabled={isAnswersEmpty}>
              작성 완료
            </Button>
          </S.ButtonContainer>
        </S.Form>
        <ConfirmModal
          title="나중에 작성하시겠습니까?"
          subTitle="작성된 내용이 모두 사라질 수 있어요."
          isOpen={isModalOpen}
          close={closeModal}
          onConfirm={() => navigate(`/room/${accessCode}/completed`, { state: { valid: true }, replace: true })}
        />
      </S.Container>
    </S.Layout>
  );
};

export default RetrospectForm;
