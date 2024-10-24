import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';

import * as S from './Question.styles';

interface QuestionProps extends React.PropsWithChildren {
  id: string;
  title: string;
  subtitle: string;
}

const Question = ({ id, title, subtitle, children }: QuestionProps) => (
  <S.Container>
    <S.LabelContainer>
      <S.Label htmlFor={id}>{title}</S.Label>
      <InformationBox description={`💡 ${subtitle}`} />
    </S.LabelContainer>
    {children}
  </S.Container>
);

export default Question;
