import { Link } from 'react-router-dom';

import type { Reference } from '@/apis/referenceLink';

import * as S from './ReferenceList.styles';

interface ReferenceListProps {
  references?: Reference[];
}

const ReferenceList = ({ references }: ReferenceListProps) => {
  if (!references || references.length < 1) return <S.EmptyLayout>저장된 링크가 없습니다.</S.EmptyLayout>;

  return (
    <S.Layout $columns={references.length}>
      <S.List $columns={references.length}>
        {references.map((reference) => {
          return (
            <S.Item key={reference.id}>
              <Link to={reference.url} target="_blank">
                {reference.image ? (
                  <S.Image alt="link" src={reference.image} />
                ) : (
                  <S.EmptyImage>
                    이미지가
                    <br />
                    없습니다
                  </S.EmptyImage>
                )}
                <S.Box>
                  <S.Title>{reference.openGraphTitle || reference.headTitle}</S.Title>
                  <S.Content>{reference.description}</S.Content>
                </S.Box>
              </Link>
            </S.Item>
          );
        })}
      </S.List>
    </S.Layout>
  );
};

export default ReferenceList;
