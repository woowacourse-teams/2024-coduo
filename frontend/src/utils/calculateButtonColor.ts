import { ButtonState } from '@/components/_common/Button/Button.type';

const intToHexColor = (decimal: number) => {
  const rrggbb = ('000000' + decimal.toString(16)).slice(-6);
  return '#' + rrggbb;
};

const hexColorToInt = (hexDecimalColor: string) => {
  const min = 0;
  const max = 16777215;
  const int = parseInt(hexDecimalColor.slice(1, 8), 16);
  if (int < min || int > max) {
    throw new Error('잘못된 색상 값입니다.');
  }
  return int;
};

export const calculateButtonColor = (hexColor: string, state: ButtonState) => {
  const int = hexColorToInt(hexColor);
  switch (state) {
    case 'hover':
      return intToHexColor(int + 100000);
    case 'active':
      return intToHexColor(int + 200000);
    default:
      return intToHexColor(int);
  }
};
