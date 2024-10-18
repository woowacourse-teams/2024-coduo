import { RiInformation2Line } from 'react-icons/ri';

import * as S from './InformationBox.styles';

interface InformationBoxProps {
  title: string;
  description: string;
}

const InformationBox = ({ title, description }: InformationBoxProps) => {
  return (
    <S.Layout role="presentation">
      <S.Title>
        <RiInformation2Line size="2rem" aria-hidden="true" />
        {title}
      </S.Title>
      <S.Description>{description}</S.Description>
    </S.Layout>
  );
};

export default InformationBox;
