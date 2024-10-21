import Reference from '@/components/CompletedPairRoom/ReferenceCard/ReferenceList/Reference/Reference';

import type { Link } from '@/apis/referenceLink';

import * as S from './ReferenceList.styles';

interface ReferenceListProps {
  references?: Link[];
}

const ReferenceList = ({ references }: ReferenceListProps) => {
  if (!references || references.length < 1) return <S.EmptyLayout>저장된 링크가 없습니다.</S.EmptyLayout>;

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
            />
          );
        })}
      </S.List>
    </S.Layout>
  );
};

export default ReferenceList;
