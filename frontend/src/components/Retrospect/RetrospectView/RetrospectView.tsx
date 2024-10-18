import { useParams } from 'react-router-dom';

import RetrospectContent from '@/components/Retrospect/RetrospectContent/RetrospectContent';
import RetrospectHeader from '@/components/Retrospect/RetrospectHeader/RetrospectHeader';

import { useGetRetrospectAnswer } from '@/queries/Retrospect/useGetRetrospectAnswer';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

import * as S from './RetrospectView.styles';

const RetrospectView = () => {
  const params = useParams();
  const retrospectId = params.retrospectId || '';
  const { pairRoomAccessCode, answer } = useGetRetrospectAnswer(retrospectId);

  const renderAnswer = (index: number) => <S.Text>{answer[index]}</S.Text>;

  return (
    <>
      <RetrospectHeader readOnly={true} accessCode={pairRoomAccessCode} />
      <RetrospectContent questions={RETROSPECT_QUESTIONS} renderAnswer={renderAnswer} />
    </>
  );
};

export default RetrospectView;
