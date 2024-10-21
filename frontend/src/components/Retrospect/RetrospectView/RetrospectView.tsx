import { useNavigate, useParams } from 'react-router-dom';

import Question from '@/components/Retrospect/Question/Question';
import RetrospectHeader from '@/components/Retrospect/RetrospectHeader/RetrospectHeader';

import { useGetRetrospectAnswer } from '@/queries/Retrospect/useGetRetrospectAnswer';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

import * as S from './RetrospectView.styles';

const RetrospectView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const retrospectId = params.retrospectId || '';
  const { accessCode, answer } = useGetRetrospectAnswer(retrospectId);

  return (
    <>
      <RetrospectHeader
        onClick={() => navigate(`/room/${accessCode}`, { replace: true })}
        readOnly={true}
        accessCode={accessCode}
      />
      {RETROSPECT_QUESTIONS.map((question, index) => (
        <Question key={question.id} id={question.id} question={question.value}>
          <S.Text>{answer[index]}</S.Text>;
        </Question>
      ))}
    </>
  );
};

export default RetrospectView;
