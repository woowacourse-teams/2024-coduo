import * as S from './QuoteLink.styles';

interface QuoteLinkProps {
  text: string;
  to: string;
  linkText: string;
}

const QuoteLink = ({ text, to, linkText }: QuoteLinkProps) => {
  return (
    <S.Container>
      <S.QuoteBar>|</S.QuoteBar>
      <S.Content>{text}</S.Content>
      <S.TextLink to={to} target="_blank">
        {linkText}
      </S.TextLink>
    </S.Container>
  );
};

export default QuoteLink;
