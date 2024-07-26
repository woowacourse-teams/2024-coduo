import * as S from './ReferenceCard.styles';

interface ReferenceProps {
  link: string;
  key: string;
}

const Reference = ({ link, key }: ReferenceProps) => {
  return (
    <li key={key}>
      <S.ReferenceLink href={link} target="_blank">
        {link}
      </S.ReferenceLink>
    </li>
  );
};

export default Reference;
