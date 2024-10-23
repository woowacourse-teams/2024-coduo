import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';

import useToastStore from '@/stores/toastStore';

import useClickOutside from '@/hooks/common/useClickOutside';
import useInput from '@/hooks/common/useInput';
import useModal from '@/hooks/common/useModal';

import useUpdateDuration from '@/queries/PairRoom/useUpdateDuration';

import { validateTimerDuration } from '@/validations/validateTimerDuration';

import * as S from './TimerEditPanel.styles';

interface TimerEditPanelProps {
  isActive: boolean;
}

const TimerEditPanel = ({ isActive }: TimerEditPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { accessCode } = useParams();
  const { addToast } = useToastStore();

  const { isModalOpen: isPanelOpen, openModal: openPanel, closeModal: closePanel } = useModal();
  const { value, handleChange, resetValue } = useInput();
  const { handleUpdateTimerDuration } = useUpdateDuration();

  const handleButtonClick = () => {
    if (isActive) {
      addToast({ status: 'ERROR', message: '타이머 작동 중에는 타이머 시간을 변경할 수 없습니다.' });
      return;
    }

    openPanel();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value || !accessCode) return;
    handleUpdateTimerDuration(value, accessCode);

    resetValue();
    closePanel();
  };

  useClickOutside(panelRef, () => closePanel());

  const isButtonDisabled = value === '' || !validateTimerDuration(value);

  return (
    <S.Layout>
      <S.Icon role="button" onClick={handleButtonClick} aria-label="타이머 시간 수정 버튼" />
      {isPanelOpen && (
        <S.Panel ref={panelRef}>
          <S.Title>타이머 시간 변경</S.Title>
          <S.Form onSubmit={handleSubmit} aria-label="타이머 시간을 분 단위로 입력해 주세요.">
            <Input id="timer" value={value} placeholder="타이머 시간 (분)" onChange={handleChange} />
            <S.ButtonContainer>
              <Button type="button" color="secondary" size="sm" filled={false} rounded={true} onClick={closePanel}>
                닫기
              </Button>
              <Button type="submit" color="secondary" size="sm" rounded={true} disabled={isButtonDisabled}>
                완료
              </Button>
            </S.ButtonContainer>
          </S.Form>
        </S.Panel>
      )}
    </S.Layout>
  );
};

export default TimerEditPanel;
