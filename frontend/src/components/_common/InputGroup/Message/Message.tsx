import { css } from 'styled-components';

import { InputStatus } from '@/components/_common/InputGroup/Input.type';

import { theme } from '@/styles/theme';

import * as S from './Message.styles';

interface MessageProps {
  $css?: ReturnType<typeof css>;
  status?: InputStatus;
  fontSize?: string;
}

const Message = ({
  status = 'DEFAULT',
  fontSize = theme.fontSize.sm,
  $css,
  children,
}: React.PropsWithChildren<MessageProps>) => {
  return (
    <S.Message role="alert" aria-live="assertive" aria-atomic="true" $status={status} $css={$css} $fontSize={fontSize}>
      {children}
    </S.Message>
  );
};

export default Message;
