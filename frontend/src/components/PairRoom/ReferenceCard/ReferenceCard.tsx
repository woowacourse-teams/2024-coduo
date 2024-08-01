import { IoIosLink } from 'react-icons/io';

import Bookmark from '@/components/common/Bookmark/Bookmark';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import useInput from '@/hooks/common/useInput';

import { theme } from '@/styles/theme';

import * as S from './ReferenceCard.styles';

import useReferenceLinks from '@/queries/PairRoom/useReferenceLinks';

interface ReferenceCardProps {
  accessCode: string;
}

const ReferenceCard = ({ accessCode }: ReferenceCardProps) => {
  const { value, status, message, handleChange, resetValue } = useInput();
  const { referenceLinks, addReferenceLink } = useReferenceLinks(accessCode);

  const isButtonActive = value !== '' && status === 'DEFAULT';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resetValue();
  };
  const IMAGE = 'https://fastly.picsum.photos/id/873/200/300.jpg?hmac=CQHrOY67pytIwHLic3cAxphNbh2NwdxnFQtwaX5MLkM';

  return (
    <PairRoomCard>
      <PairRoomCard.Header icon={<IoIosLink color={theme.color.primary[500]} />} title="링크">
        <S.ReferenceLinkForm onSubmit={handleSubmit}>
          <Input
            placeholder="링크를 입력해주세요."
            value={value}
            status={status}
            message={message}
            onChange={handleChange}
          />
          <Button
            disabled={!isButtonActive}
            css={S.buttonStyle}
            color="secondary"
            rounded={true}
            onClick={() => addReferenceLink({ accessCode, url: value })}
          >
            링크 추가
          </Button>
        </S.ReferenceLinkForm>
      </PairRoomCard.Header>
      <S.ReferenceList>
        {referenceLinks.length > 0 ? (
          referenceLinks.map(({ url, id }) => {
            return <Bookmark link={url} image={IMAGE} key={id} />;
          })
        ) : (
          <S.EmptyText>저장된 링크가 없습니다.</S.EmptyText>
        )}
      </S.ReferenceList>
    </PairRoomCard>
  );
};

export default ReferenceCard;
