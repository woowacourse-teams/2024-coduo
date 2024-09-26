import { RiInformation2Line } from 'react-icons/ri';

import * as S from './InformationBox.styles';

interface InformationBoxProps {
  title: string;
  description: string;
}

const InformationBox = ({ title, description }: InformationBoxProps) => {
  return (
    <S.Layout>
      <S.Title>
        <RiInformation2Line size="2rem" />
        {title}
      </S.Title>
      <S.Description>{description}</S.Description>
    </S.Layout>
  );
};

export default InformationBox;
