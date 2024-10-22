import { useNavigate, useParams } from 'react-router-dom';

import Question from '@/components/Retrospect/Question/Question';
import RetrospectHeader from '@/components/Retrospect/RetrospectHeader/RetrospectHeader';

import { useGetRetrospectAnswer } from '@/queries/Retrospect/useGetRetrospectAnswer';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

import * as S from './RetrospectView.styles';

const RetrospectView = () => {
  const navigate = useNavigate();
  const { retrospectId } = useParams();
  const { accessCode, answers } = useGetRetrospectAnswer(retrospectId || '');

  return (
    <>
      <RetrospectHeader
        onClick={() => navigate(`/room/${accessCode}`, { replace: true })}
        readOnly={true}
        accessCode={accessCode}
      />
      {RETROSPECT_QUESTIONS.map((question, index) => (
        <Question key={question.id} id={question.id} title={question.title} subtitle={question.subtitle}>
          <S.Text>{answers[index]}</S.Text>
        </Question>
      ))}
    </>
  );
};

export default RetrospectView;
