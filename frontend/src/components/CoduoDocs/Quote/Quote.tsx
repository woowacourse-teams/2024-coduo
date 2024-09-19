import * as S from './Quote.styles';

interface QuoteProps {
  text: string;
  href?: string;
  linkText?: string;
  isNewBrowserOpen?: boolean;
}

const Quote = ({ text, href, linkText, isNewBrowserOpen = false }: QuoteProps) => {
  return (
    <S.Container>
      <S.QuoteBar>|</S.QuoteBar>
      <S.Content>{text}</S.Content>
      {href && linkText && (
        <S.TextLink href={href} target={isNewBrowserOpen ? '_blank' : ''}>
          {linkText}
        </S.TextLink>
      )}
    </S.Container>
  );
};

export default Quote;
