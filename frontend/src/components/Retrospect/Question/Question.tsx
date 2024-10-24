import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';

import * as S from './Question.styles';

interface QuestionProps extends React.PropsWithChildren {
  readonly?: boolean;
  id: string;
  title: string;
  subtitle: string;
}

const Question = ({ readonly = false, id, title, subtitle, children }: QuestionProps) => (
  <S.Container>
    <S.LabelContainer>
      <S.Label htmlFor={id}>{title}</S.Label>
      {!readonly && <InformationBox description={`💡 ${subtitle}`} />}
    </S.LabelContainer>
    {children}
  </S.Container>
);

export default Question;
