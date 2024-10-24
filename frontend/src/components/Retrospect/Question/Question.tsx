import * as S from './Question.styles';

interface QuestionProps extends React.PropsWithChildren {
  id: string;
  title: string;
  subtitle: string;
}

const Question = ({ id, title, subtitle, children }: QuestionProps) => (
  <S.Container>
    <S.Label htmlFor={id}>{title}</S.Label>
    <S.Subtitle>💡 {subtitle}</S.Subtitle>
    {children}
  </S.Container>
);

export default Question;
