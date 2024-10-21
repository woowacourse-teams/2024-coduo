import * as S from './Question.styles';

interface QuestionProps extends React.PropsWithChildren {
  id: string;
  question: string;
}

const Question = ({ id, question, children }: QuestionProps) => (
  <S.Container>
    <S.Label htmlFor={id}>{question}</S.Label>
    {children}
  </S.Container>
);

export default Question;
