import * as S from './Quote.styles';

interface QuoteProps {
  text: string;
  to?: string;
  linkText?: string;
}

const Quote = ({ text, to, linkText }: QuoteProps) => {
  return (
    <S.Container>
      <S.QuoteBar>|</S.QuoteBar>
      <S.Content>{text}</S.Content>
      {to && linkText && (
        <S.TextLink to={to} target="_blank">
          {linkText}
        </S.TextLink>
      )}
    </S.Container>
  );
};

export default Quote;
