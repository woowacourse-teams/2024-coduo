import { IoIosLink } from 'react-icons/io';

import Button from '@/components/common/Button/Button';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import { theme } from '@/styles/theme';

import * as S from './ReferenceCard.styles';

// TODO: 레퍼런스 모음 기능 추가
const ReferenceCard = () => {
  return (
    <PairRoomCard>
      <PairRoomCard.Header icon={<IoIosLink color={theme.color.primary[500]} />} title="링크">
        <Button css={S.buttonStyle} color="secondary" rounded={true}>
          링크 추가하기
        </Button>
      </PairRoomCard.Header>
    </PairRoomCard>
  );
};

export default ReferenceCard;
