import { useParams } from 'react-router-dom';

import RetrospectContent from '@/components/Retrospect/RetrospectContent/RetrospectContent';
import RetrospectHeader from '@/components/Retrospect/RetrospectHeader/RetrospectHeader';

import { useGetRetrospectAnswer } from '@/queries/Retrospect/useGetRetrospectAnswer';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

const RetrospectView = () => {
  const params = useParams();
  const retrospectId = params.retrospectId || '';
  const { pairRoomAccessCode, answer } = useGetRetrospectAnswer(retrospectId);

  return (
    <>
      <RetrospectHeader readOnly={true} accessCode={pairRoomAccessCode} />
      <RetrospectContent questions={RETROSPECT_QUESTIONS} answers={answer} readOnly={true} />
    </>
  );
};

export default RetrospectView;
