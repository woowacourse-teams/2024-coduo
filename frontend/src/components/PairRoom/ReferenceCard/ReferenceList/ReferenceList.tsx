import Bookmark from '@/components/PairRoom/ReferenceCard/Bookmark/Bookmark';

import type { Link } from '@/apis/referenceLink';

import * as S from './ReferenceList.styles';

interface ReferenceListProps {
  referenceLinks: Link[];
  onDeleteReferenceLink: (id: number) => void;
}

const ReferenceList = ({ referenceLinks, onDeleteReferenceLink }: ReferenceListProps) => {
  return (
    <S.Layout>
      {referenceLinks.length > 0 ? (
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
      ) : (
        <S.EmptyText>저장된 링크가 없습니다.</S.EmptyText>
      )}
    </S.Layout>
  );
};

export default ReferenceList;
