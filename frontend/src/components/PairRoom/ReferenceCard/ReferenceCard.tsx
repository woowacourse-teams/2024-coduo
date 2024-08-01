import { IoIosLink } from 'react-icons/io';

import useReferenceLinks from '@/queries/PairRoom/useReferenceLinks';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import ReferenceItem from '@/components/PairRoom/ReferenceCard/ReferenceItem';

import useInput from '@/hooks/common/useInput';

import { theme } from '@/styles/theme';

import * as S from './ReferenceCard.styles';

type Status = 'ERROR' | 'DEFAULT';

interface ReferenceCardProps {
  accessCode: string;
}

const ReferenceCard = ({ accessCode }: ReferenceCardProps) => {
  const { referenceLinks, addReferenceLink } = useReferenceLinks(accessCode);
  const { inputValue, handleOnChange, resetInputValue } = useInput({ value: '', message: '', status: 'DEFAULT' });

  const buttonActive = inputValue.value !== '' && inputValue.status === 'default';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resetInputValue();
  };

  const addReference = (url: string) => {
    addReferenceLink({ accessCode, url });
  };

  return (
    <PairRoomCard>
      <PairRoomCard.Header icon={<IoIosLink color={theme.color.primary[500]} />} title="링크">
        <S.ReferenceLinkForm onSubmit={handleSubmit}>
          <Input
            placeholder="링크를 입력해주세요."
            value={inputValue.value}
            status={inputValue.status as Status}
            onChange={(event) => handleOnChange(event)}
            label=""
            message={inputValue.message}
          />
          <Button
            disabled={!buttonActive}
            css={S.buttonStyle}
            color="SECONDARY"
            rounded={true}
            onClick={() => addReference(inputValue.value)}
          >
            링크 추가
          </Button>
        </S.ReferenceLinkForm>
      </PairRoomCard.Header>
      <S.ReferenceList>
        {referenceLinks.length > 0 ? (
          referenceLinks.map((link) => {
            return <ReferenceItem key={link.id} link={link.url} />;
          })
        ) : (
          <S.EmptyText>저장된 링크가 없습니다.</S.EmptyText>
        )}
      </S.ReferenceList>
    </PairRoomCard>
  );
};

export default ReferenceCard;
