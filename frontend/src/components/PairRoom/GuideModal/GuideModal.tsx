import { useRef } from 'react';

import { FaCheck } from 'react-icons/fa6';

import { AlarmSound } from '@/assets';

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

import useToastStore from '@/stores/toastStore';

import useCopyClipBoard from '@/hooks/common/useCopyClipboard';

import * as S from './GuideModal.styles';

interface GuideModalProps {
  isOpen: boolean;
  close: () => void;
  accessCode: string;
}

const GuideModal = ({ isOpen, close, accessCode }: GuideModalProps) => {
  const alarmAudio = useRef(new Audio(AlarmSound));

  const { addToast } = useToastStore();

  const [, onCopy] = useCopyClipBoard();

  const checkPermission = () => {
    if (Notification.permission !== 'granted') {
      addToast({ status: 'ERROR', message: '알림 권한이 허용되지 않았습니다. 설정에서 권한을 허용해 주세요.' });
      return;
    }

    addToast({ status: 'SUCCESS', message: '알림 권한이 허용된 상태입니다.' });
  };

  return (
    <Modal isOpen={isOpen} close={close} size="70rem">
      <Modal.CloseButton close={close} />
      <S.Layout>
        <S.Title>페어 프로그래밍을 시작하기 전에...</S.Title>
        <S.List>
          <S.Item>
            <S.Question>
              <FaCheck />
              브라우저 알림을 허용하셨나요?
            </S.Question>
            <S.Description>
              브라우저 알림을 허용하지 않으면 타이머 종료 시 올바르게 알림을 제공할 수 없어요.
              <Button css={S.buttonStyles} onClick={checkPermission}>
                권한 확인
              </Button>
            </S.Description>
          </S.Item>
          <S.Item>
            <S.Question>
              <FaCheck />
              사용 중인 기기의 소리가 켜져 있나요?
            </S.Question>
            <S.Description>
              사용 중인 기기의 소리가 꺼져 있다면 타이머 종료 시 알람 소리를 들으실 수 없어요.
              <Button css={S.buttonStyles} onClick={() => alarmAudio.current.play()}>
                소리 확인
              </Button>
            </S.Description>
          </S.Item>
          <S.Item>
            <S.Question>
              <FaCheck />
              페어룸 코드를 복사하셨나요?
            </S.Question>
            <S.Description>
              페어에게 페어룸 코드를 전달하여 페어룸에 들어올 수 있도록 해주세요.
              <Button css={S.buttonStyles} onClick={() => onCopy(accessCode)}>
                코드 복사
              </Button>
            </S.Description>
          </S.Item>
        </S.List>
        <Modal.Footer position="CENTER">
          <S.ButtonContainer>
            <p>모두 확인하셨나요?</p>
            <Button css={S.startButtonStyles} onClick={close}>
              시작하기
            </Button>
          </S.ButtonContainer>
        </Modal.Footer>
      </S.Layout>
    </Modal>
  );
};

export default GuideModal;
