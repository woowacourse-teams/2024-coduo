import { Link } from 'react-router-dom';

import useSocketStore from '@/stores/socketStore';

import type { Reference } from '@/apis/http/referenceLink';
import { publishReferenceMessage } from '@/apis/websocket/reference';

import * as S from './ReferenceList.styles';

interface ReferenceListProps {
  references: Reference[];
}

const ReferenceList = ({ references }: ReferenceListProps) => {
  const { client, accessCode } = useSocketStore();

  if (!references || references.length < 1) return <S.EmptyLayout>저장된 링크가 없습니다.</S.EmptyLayout>;

  const columns = references.length;

  const handleDeleteReference = (referenceLinkId: number) => {
    publishReferenceMessage.delete(client, accessCode, referenceLinkId);
  };

  return (
    <S.Layout $columns={columns}>
      <S.List $columns={columns}>
        {references.map((reference) => {
          return (
            <S.Item key={reference.id}>
              <S.DeleteButton onClick={() => handleDeleteReference(reference.id)} />
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
