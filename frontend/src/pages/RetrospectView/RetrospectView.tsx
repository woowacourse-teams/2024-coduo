import { useNavigate, useParams } from 'react-router-dom';

import Header from '@/components/Retrospect/Header/Header';
import Question from '@/components/Retrospect/Question/Question';

import { useGetRetrospectAnswer } from '@/queries/Retrospect/useGetRetrospectAnswer';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

import * as S from './RetrospectView.styles';

const RetrospectView = () => {
  const { accessCode } = useParams();

  const navigate = useNavigate();

  const answers = useGetRetrospectAnswer(accessCode || '');

  return (
    <S.Layout>
      <S.Container>
        <Header
          title={accessCode || ''}
          subTitle={`${accessCode}에서 작성한 회고입니다!`}
          buttonText="페어룸으로 이동"
          onButtonClick={() => navigate(`/room/${accessCode}/completed`, { state: { valid: true }, replace: true })}
        />
        {RETROSPECT_QUESTIONS.map((question, index) => (
          <Question
            key={question.id}
            readonly={true}
            id={question.id}
            title={question.title}
            subtitle={question.subtitle}
          >
            <S.TextWrapper>{answers[index]}</S.TextWrapper>
          </Question>
        ))}
      </S.Container>
    </S.Layout>
  );
};

export default RetrospectView;
