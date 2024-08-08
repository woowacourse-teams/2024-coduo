import Bookmark from '@/components/PairRoom/ReferenceCard/Bookmark/Bookmark';

import type { Link } from '@/apis/referenceLink';

import * as S from './ReferenceList.styles';

interface ReferenceListProps {
  referenceLinks: Link[];
  onDeleteReferenceLink: (id: number) => void;
}

const ReferenceList = ({ referenceLinks, onDeleteReferenceLink }: ReferenceListProps) => {
  return referenceLinks.length > 0 ? (
    <S.Layout>
      <S.List>
        {referenceLinks.map((link) => {
          return (
            <Bookmark
              key={link.id}
              url={link.url}
              image={link.image}
              title={link.openGraphTitle || link.headTitle}
              description={link.description}
              onDeleteBookmark={() => onDeleteReferenceLink(link.id)}
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
