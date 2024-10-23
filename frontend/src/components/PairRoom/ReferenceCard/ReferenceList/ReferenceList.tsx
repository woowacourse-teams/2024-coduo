import { Link } from 'react-router-dom';

import type { Reference } from '@/apis/referenceLink';

import { useDeleteReferenceLink } from '@/queries/PairRoom/reference/mutation';

import * as S from './ReferenceList.styles';

interface ReferenceListProps {
  accessCode: string;
  references?: Reference[];
}

const ReferenceList = ({ accessCode, references }: ReferenceListProps) => {
  const { mutate } = useDeleteReferenceLink();

  if (!references || references.length < 1) return <S.EmptyLayout>저장된 링크가 없습니다.</S.EmptyLayout>;

  const columns = references.length;

  return (
    <S.Layout $columns={columns}>
      <S.List $columns={columns}>
        {references.map((reference) => {
          return (
            <S.Item key={reference.id}>
              <S.DeleteButton onClick={() => mutate({ id: reference.id, accessCode })} />
              <Link to={reference.url} target="_blank">
                {reference.image ? (
                  <S.Image alt="link" src={reference.image} />
                ) : (
                  <S.NoneImage>
                    이미지가
                    <br />
                    없습니다
                  </S.NoneImage>
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
