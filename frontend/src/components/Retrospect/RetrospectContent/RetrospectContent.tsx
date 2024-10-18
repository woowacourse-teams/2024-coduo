import { RetrospectQuestion } from '@/components/Retrospect/retrospect.type';
import Question from '@/components/Retrospect/RetrospectContent/QuestionItem/Question';

import * as S from './RetrospectContent.styles';

interface RetrospectContentProps {
  questions: RetrospectQuestion[];
  answers: string[];
  readOnly: boolean;
  onChange?: (index: number, value: string) => void;
}
const RetrospectContent = ({ questions, answers, readOnly, onChange }: RetrospectContentProps) => {
  return (
    <>
      {questions.map((question, index) => (
        <Question key={question.id} id={question.id} question={question.value}>
          {readOnly ? (
            <S.Text>{answers[index]}</S.Text>
          ) : (
            <S.TextArea
              placeholder="질문에 대한 답변을 작성해주세요."
              id={question.id}
              value={answers[index]}
              onChange={(event) => onChange && onChange(index, event.target.value)}
            />
          )}
        </Question>
      ))}
    </>
  );
};

export default RetrospectContent;
