import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IoIosLink } from 'react-icons/io';

import { getReferenceLinks, addReferenceLink } from '@/apis/referenceLink';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import Reference from '@/components/PairRoom/ReferenceCard/Reference';

import { getReferenceLinks, addReferenceLink } from '@/apis/referenceLink';

import useInput from '@/hooks/useInput';

import { theme } from '@/styles/theme';

import * as S from './ReferenceCard.styles';

type Status = 'error' | 'default';

interface ReferenceCardProps {
  accessCode: string;
}

const ReferenceCard = ({ accessCode }: ReferenceCardProps) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['getReferenceLinks'],
    queryFn: () => getReferenceLinks({ accessCode }),
  });

  const { mutate } = useMutation({
    mutationFn: addReferenceLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getReferenceLinks'] });
    },
    onError: (error) => alert(error.message),
  });

  const { inputValue, handleOnChange, resetInputValue } = useInput({ value: '', message: '', status: 'default' });

  const buttonActive = inputValue.value !== '' && inputValue.status === 'default';

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
            data.map((data) => {
              return <Reference key={data.id} link={data.url} />;
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
