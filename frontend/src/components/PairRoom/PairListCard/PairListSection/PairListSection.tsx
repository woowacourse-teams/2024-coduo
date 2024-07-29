import * as S from './PairListSection.styles';

interface PairListSectionProps {
  isOpen: boolean;
  driver: string;
  navigator: string;
}

const PairListSection = ({ isOpen, driver, navigator }: PairListSectionProps) => (
  <div>
    <S.PairItem>
      {isOpen && <S.PairRole $role="driver">드라이버</S.PairRole>}
      <S.PairName>{driver}</S.PairName>
    </S.PairItem>
    <S.PairItem>
      {isOpen && <S.PairRole $role="navigator">네비게이터</S.PairRole>}
      <S.PairName>{navigator}</S.PairName>
    </S.PairItem>
  </div>
);

export default PairListSection;
