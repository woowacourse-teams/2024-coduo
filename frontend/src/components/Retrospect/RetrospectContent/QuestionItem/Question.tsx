import { ReactNode } from 'react';

import * as S from './Question.styles';

interface QuestionProps {
  id: string;
  question: string;
  children: ReactNode;
}

const Question = ({ id, question, children }: QuestionProps) => (
  <S.Container>
    <S.Label htmlFor={id}>{question}</S.Label>
    {children}
  </S.Container>
);

export default Question;
