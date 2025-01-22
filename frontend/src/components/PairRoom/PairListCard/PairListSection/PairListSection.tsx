import * as S from './PairListSection.styles';

interface PairListSectionProps {
  isOpen: boolean;
  driver: string;
  navigator: string;
}

const PairListSection = ({ isOpen, driver, navigator }: PairListSectionProps) => {
  return (
    <div>
      <S.PairItem aria-label={`현재 드라이버는 ${driver}입니다.`}>
        {isOpen && <S.PairRole $role="DRIVER">드라이버</S.PairRole>}
        <S.PairName>{driver}</S.PairName>
      </S.PairItem>
      <S.PairItem aria-label={`현재 내비게이터는 ${navigator}입니다.`}>
        {isOpen && <S.PairRole $role="NAVIGATOR">내비게이터</S.PairRole>}
        <S.PairName>{navigator}</S.PairName>
      </S.PairItem>
    </div>
  );
};

export default PairListSection;
