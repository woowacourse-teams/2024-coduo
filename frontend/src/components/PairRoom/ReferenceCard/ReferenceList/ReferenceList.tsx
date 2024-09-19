import Reference from '@/components/PairRoom/ReferenceCard/Bookmark/Reference';

import type { Link } from '@/apis/referenceLink/referenceLink';

import * as S from './ReferenceList.styles';

interface ReferenceListProps {
  referenceLinks: Link[];
  onDeleteReferenceLink: (id: number) => void;
}

const ReferenceList = ({ referenceLinks, onDeleteReferenceLink }: ReferenceListProps) => {
  return referenceLinks.length > 0 ? (
    <S.Layout $columns={referenceLinks.length}>
      <S.List $columns={referenceLinks.length}>
        {referenceLinks.map((link) => {
          return (
            <Reference
              key={link.id}
              url={link.url}
              image={link.image}
              title={link.openGraphTitle || link.headTitle}
              description={link.description}
              onDeleteReference={() => onDeleteReferenceLink(link.id)}
            />
          );
        })}
      </S.List>
    </S.Layout>
  ) : (
    <S.EmptyLayout>저장된 링크가 없습니다.</S.EmptyLayout>
  );
};

export default ReferenceList;
