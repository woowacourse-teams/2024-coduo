import { Suspense } from 'react';

import Loading from '@/pages/Loading/Loading';

import RetrospectForm from '@/components/Retrospect/RetrospectForm/RetrospectForm';
import RetrospectView from '@/components/Retrospect/RetrospectView/RetrospectView';

import * as S from './Retrospect.styles';

interface RetrospectProps {
  readOnly?: boolean;
}

const Retrospect = ({ readOnly = true }: RetrospectProps) => {
  return (
    <S.Layout>
      <S.Container>
        {readOnly ? (
          <Suspense fallback={<Loading />}>
            <RetrospectView />
          </Suspense>
        ) : (
          <RetrospectForm />
        )}
      </S.Container>
    </S.Layout>
  );
};

export default Retrospect;
