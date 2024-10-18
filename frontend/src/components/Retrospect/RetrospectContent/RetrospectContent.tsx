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

// RetrospectForm 에는 label, textarea, 각 입력 상태와 정규식 및 폼 제출 필요
// RetrospectView 에는 label, 서버에서 받은 답변 list
// UI 는 active 시 색과 선 색 바뀜
// RetrospectForm 에 Textarea 컴포넌트 가져와서 RETROSPECT_QUESTIONS.map((question)=>{<Textarea/>})
// const [answer,setAnswer]= useState()
// answer = [] 인데 RETROSPECT_QUESTIONS.length 만큼의 값이 있음.
// setAnswer 시 answer[index] 를 가져와서 수정해줌.
// RetrospectView 에 Answer 컴포넌트 가져와서 RETROSPECT_QUESTIONS.map((question)=>{<Answer/>})
