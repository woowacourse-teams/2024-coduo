import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IoIosLink } from 'react-icons/io';

import Bookmark from '@/components/common/Bookmark/Bookmark';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import { getReferenceLinks, addReferenceLink } from '@/apis/referenceLink';

import useInput from '@/hooks/common/useInput';

import { QUERY_KEYS } from '@/constants/queryKeys';

import { theme } from '@/styles/theme';

import * as S from './ReferenceCard.styles';

type Status = 'ERROR' | 'DEFAULT';

interface ReferenceCardProps {
  accessCode: string;
}

const ReferenceCard = ({ accessCode }: ReferenceCardProps) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS],
    queryFn: () => getReferenceLinks({ accessCode }),
  });

  const { mutate } = useMutation({
    mutationFn: addReferenceLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS] });
    },
    onError: (error) => alert(error.message),
  });

  const { inputValue, handleOnChange, resetInputValue } = useInput({ value: '', message: '', status: 'DEFAULT' });

  const buttonActive = inputValue.value !== '' && inputValue.status === 'DEFAULT';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resetInputValue();
  };

  const addReference = (url: string) => {
    mutate({ accessCode, url });
  };

  return (
    <>
      <PairRoomCard>
        <PairRoomCard.Header icon={<IoIosLink color={theme.color.primary[500]} />} title="링크">
          <S.ReferenceLinkForm onSubmit={handleSubmit}>
            <Input
              placeholder="링크를 입력해주세요."
              value={inputValue.value}
              status={inputValue.status as Status}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)}
              label=""
              message={inputValue.message}
            />
            <Button
              disabled={!buttonActive}
              css={S.buttonStyle}
              color="secondary"
              rounded={true}
              onClick={() => addReference(inputValue.value)}
            >
              링크 추가
            </Button>
          </S.ReferenceLinkForm>
        </PairRoomCard.Header>
        <S.ReferenceList>
          {data ? (
            data.map(({ id, url }) => {
              return <Bookmark link={url} key={id} />;
            })
          ) : (
            <S.EmptyText>저장된 링크가 없습니다.</S.EmptyText>
          )}
        </S.ReferenceList>
      </PairRoomCard>
    </>
  );
};

export default ReferenceCard;
