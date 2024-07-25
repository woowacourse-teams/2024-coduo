// import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { IoIosLink } from 'react-icons/io';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import Reference from '@/components/PairRoom/ReferenceCard/Reference';

import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';

import { theme } from '@/styles/theme';

import * as S from './ReferenceCard.styles';

import { addReferenceLink } from '@/apis/reference';

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
  const { isModalOpen, closeModal, modalToggle } = useModal();
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

  const linkRegexp = /\b(https?:\/\/\S*)\b/;

  const buttonActive = inputValue.value !== '' && inputValue.status === 'default';

  const validateLink = (value: string) => {
    if (linkRegexp.test(value)) {
      return { status: 'default', message: '' };
    }

    return { status: 'error', message: '올바른 링크 형식으로 입력해주세요' };
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitted value:', inputValue.value);
    resetInputValue();
    closeModal();
  };

  const closeForm = () => {
    closeModal();
    resetInputValue();
  };

  const addReference = (url: string) => {
    mutate({ url });
  };
  return (
    <>
      <PairRoomCard>
        <PairRoomCard.Header icon={<IoIosLink color={theme.color.primary[500]} />} title="링크">
          <Button css={S.buttonStyle} color="secondary" rounded={true} onClick={modalToggle}>
            링크 추가하기
          </Button>
        </PairRoomCard.Header>
        <S.ReferenceList>
          {DATA.map((data) => {
            return <Reference key={data.id} link={data.url} />;
          })}
        </S.ReferenceList>
      </PairRoomCard>

      {isModalOpen && (
        <S.ReferenceLinkForm onSubmit={handleSubmit}>
          <Input
            value={inputValue.value}
            status={inputValue.status as Status}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event, validateLink)}
            label=""
            message={inputValue.message}
          />
          <Button
            onClick={() => addReference(inputValue.value)}
            filled={true}
            size="sm"
            type="submit"
            disabled={!buttonActive}
          >
            확인
          </Button>
          <Button filled={false} size="sm" onClick={closeForm}>
            취소
          </Button>
        </S.ReferenceLinkForm>
      )}
    </>
  );
};

export default ReferenceCard;
