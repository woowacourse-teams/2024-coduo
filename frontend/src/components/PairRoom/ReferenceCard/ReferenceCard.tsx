// import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { IoIosLink } from 'react-icons/io';

import { addReferenceLink } from '@/apis/reference';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import Reference from '@/components/PairRoom/ReferenceCard/Reference';

import useInput from '@/hooks/useInput';

import { theme } from '@/styles/theme';

import * as S from './ReferenceCard.styles';

// import { getReference } from '@/apis/reference';

type Status = 'error' | 'default';
// TODO: 레퍼런스 모음 기능 추가
const DATA = [
  {
    url: 'https://github.com/woowacourse-teams/2024-coduo/pull/114',
    id: '1',
  },
  {
    url: 'https://github.com/woowacourse-teams/2024-coduo/pull/114',
    id: '2',
  },
  {
    url: 'https://github.com/woowacourse-teams/2024-coduo/pull/114',
    id: '3',
  },
];
const ReferenceCard = () => {
  const { inputValue, handleOnChange, resetInputValue } = useInput({ value: '', message: '', status: 'default' });

  // const { data: DATA } = useQuery({
  //   queryKey: ['fetchCartItems'],
  //   queryFn: getReference,
  // });

  const { mutate } = useMutation({
    mutationFn: addReferenceLink,
    onSuccess: () => {},
    onError: (error) => alert(error.message),
  });

  const buttonActive = inputValue.value !== '' && inputValue.status === 'default';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitted value:', inputValue.value);
    resetInputValue();
  };

  const addReference = (url: string) => {
    mutate({ url });
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
          {DATA.map((data) => {
            return <Reference key={data.id} link={data.url} />;
          })}
        </S.ReferenceList>
      </PairRoomCard>
    </>
  );
};

export default ReferenceCard;
