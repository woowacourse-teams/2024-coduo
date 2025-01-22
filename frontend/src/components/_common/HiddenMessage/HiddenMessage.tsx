import * as S from './HiddenMessage.styles';

const HiddenMessage = ({ children }: React.PropsWithChildren) => {
  return <S.Layout aria-live="polite">{children}</S.Layout>;
};

export default HiddenMessage;
