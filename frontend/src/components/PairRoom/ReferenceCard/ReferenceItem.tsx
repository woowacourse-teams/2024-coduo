import * as S from './ReferenceCard.styles';

interface ReferenceItemProps {
  key: string;
  link: string;
}

const ReferenceItem = ({ link, key }: ReferenceItemProps) => {
  return (
    <li key={key}>
      <S.ReferenceLink href={link} target="_blank">
        {link}
      </S.ReferenceLink>
    </li>
  );
};

export default ReferenceItem;
