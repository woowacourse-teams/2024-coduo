import { RetrospectQuestion } from '@/components/Retrospect/retrospect.type';
import Question from '@/components/Retrospect/RetrospectContent/Question/Question';

interface RetrospectContentProps {
  questions: RetrospectQuestion[];
  renderAnswer: (index: number, id: string) => React.ReactNode;
}
const RetrospectContent = ({ questions, renderAnswer }: RetrospectContentProps) => {
  return (
    <>
      {questions.map((question, index) => (
        <Question key={question.id} id={question.id} question={question.value}>
          {renderAnswer(index, question.id)}
        </Question>
      ))}
    </>
  );
};

export default RetrospectContent;
