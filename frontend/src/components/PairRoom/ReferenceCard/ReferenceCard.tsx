import { useState } from 'react';

import { IoIosLink } from 'react-icons/io';
import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import ReferenceList from '@/components/PairRoom/ReferenceCard/ReferenceList/ReferenceList';

import useInput from '@/hooks/common/useInput';

import useReferenceLinks from '@/queries/PairRoom/useReferenceLinks';

import { theme } from '@/styles/theme';

import * as S from './ReferenceCard.styles';

interface ReferenceCardProps {
  accessCode: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const ReferenceCard = ({ accessCode, isOpen, toggleIsOpen }: ReferenceCardProps) => {
  const [isFooterOpen, setIsFooterOpen] = useState(false);

  const { value, status, message, handleChange, resetValue } = useInput();
  const { referenceLinks, handleAddReferenceLink, handleDeleteReferenceLink } = useReferenceLinks(accessCode);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    handleAddReferenceLink(value);

    resetValue();
    setIsFooterOpen(false);
  };

  return (
    <S.Layout>
      <PairRoomCard>
        <PairRoomCard.Header
          icon={<IoIosLink color={theme.color.primary[500]} />}
          title="링크"
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
        />
        {isOpen && (
          <S.Body>
            <ReferenceList referenceLinks={referenceLinks} onDeleteReferenceLink={handleDeleteReferenceLink} />
            <S.Footer>
              {isFooterOpen ? (
                <S.Form onSubmit={handleSubmit}>
                  <Input
                    $css={S.inputStyles}
                    placeholder="링크를 입력해주세요."
                    value={value}
                    status={status}
                    message={message}
                    onChange={handleChange}
                  />
                  <S.ButtonContainer>
                    <Button
                      type="button"
                      size="sm"
                      filled={false}
                      rounded={true}
                      onClick={() => setIsFooterOpen(false)}
                    >
                      취소
                    </Button>
                    <Button type="submit" size="sm" rounded={true} disabled={value === '' || status !== 'DEFAULT'}>
                      확인
                    </Button>
                  </S.ButtonContainer>
                </S.Form>
              ) : (
                <S.FooterButton onClick={() => setIsFooterOpen(true)}>
                  <LuPlus />
                  링크 추가하기
                </S.FooterButton>
              )}
            </S.Footer>
          </S.Body>
        )}
      </PairRoomCard>
    </S.Layout>
  );
};

export default ReferenceCard;
