import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '@/pages/Loading/Loading';

import RetrospectForm from '@/components/Retrospect/RetrospectForm/RetrospectForm';
import RetrospectView from '@/components/Retrospect/RetrospectView/RetrospectView';

import * as S from './Retrospect.styles';

interface RetrospectProps {
  readOnly?: boolean;
}

const Retrospect = ({ readOnly = true }: RetrospectProps) => {
  const { accessCode } = useParams();

  return (
    <S.Layout>
      <S.Container>
        {readOnly ? (
          <Suspense fallback={<Loading />}>
            <RetrospectView accessCode={accessCode || ''} />
          </Suspense>
        ) : (
          <RetrospectForm accessCode={accessCode || ''} />
        )}
      </S.Container>
    </S.Layout>
  );
};

export default Retrospect;
