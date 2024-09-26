import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { validateTimerDuration } from '@/validations/validateTimerDuration';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';

import useToastStore from '@/stores/toastStore';

import useClickOutside from '@/hooks/common/useClickOutside';
import useInput from '@/hooks/common/useInput';
import useModal from '@/hooks/common/useModal';

import useUpdateDuration from '@/queries/PairRoom/useUpdateDuration';

import { BUTTON_TEXT } from '@/constants/button';

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
  const { handleUpdateTimerDuration } = useUpdateDuration(() =>
    addToast({ status: 'SUCCESS', message: '타이머 시간이 변경되었습니다.' }),
  );

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
      <S.Icon onClick={handleButtonClick} />
      {isPanelOpen && (
        <S.Panel ref={panelRef}>
          <S.Title>타이머 시간 변경</S.Title>
          <S.Form onSubmit={handleSubmit}>
            <Input id="timer" value={value} placeholder="타이머 시간 (분)" onChange={handleChange} />
            <S.ButtonContainer>
              <Button type="button" color="secondary" size="sm" filled={false} rounded={true} onClick={closePanel}>
                {BUTTON_TEXT.CLOSE}
              </Button>
              <Button type="submit" color="secondary" size="sm" rounded={true} disabled={isButtonDisabled}>
                {BUTTON_TEXT.COMPLETE}
              </Button>
            </S.ButtonContainer>
          </S.Form>
        </S.Panel>
      )}
    </S.Layout>
  );
};

export default TimerEditPanel;
