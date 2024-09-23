import Reference from '@/components/PairRoom/ReferenceCard/ReferenceList/Reference/Reference';

import type { Link } from '@/apis/referenceLink';

import { useDeleteReferenceLink } from '@/queries/PairRoom/reference/mutation';

import * as S from './ReferenceList.styles';

interface ReferenceListProps {
  references?: Link[];
  accessCode: string;
}

const ReferenceList = ({ references, accessCode }: ReferenceListProps) => {
  const deleteReference = useDeleteReferenceLink().mutate;

  if (!references || references.length > 0) return <S.EmptyLayout>저장된 링크가 없습니다.</S.EmptyLayout>;

  return (
    <S.Layout $columns={references.length}>
      <S.List $columns={references.length}>
        {references.map((reference) => {
          return (
            <Reference
              key={reference.id}
              url={reference.url}
              image={reference.image}
              title={reference.openGraphTitle || reference.headTitle}
              description={reference.description}
              onDeleteReference={() => deleteReference({ id: reference.id, accessCode })}
            />
          );
        })}
      </S.List>
    </S.Layout>
  );
};

export default ReferenceList;
