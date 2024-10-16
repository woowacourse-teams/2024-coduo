import { DefaultTheme } from 'styled-components';

const color = {
  primary: {
    100: '#F1FBFA',
    200: '#D8FFFB',
    300: '#97FBD5',
    400: '#62F5CA',
    500: '#00E0C8',
    600: '#00C0BD',
    700: '#0094A0',
    800: '#00506B',
  },
  secondary: {
    100: '#FFF8DC',
    150: '#FFF3CB',
    200: '#FFEEBA',
    300: '#FFE296',
    400: '#FFD67D',
    500: '#FFC453',
    600: '#FFA800',
    700: '#B87C2A',
    800: '#935D1A',
    900: '#7A4510',
  },
  success: {
    100: '#F1FBD1',
    200: '#E0F8A4',
    300: '#C4EB74',
    400: '#A5D84F',
    500: '#7CBF1E',
    600: '#63A415',
    700: '#4C890F',
    800: '#376E09',
    900: '#295B05',
  },
  info: {
    100: '#DEEAFF',
    200: '#BED5FF',
    300: '#9EBDFF',
    400: '#86A9FF',
    500: '#5E89FF',
    600: '#4468DB',
    700: '#2F4CB7',
    800: '#1D3393',
    900: '#001666',
  },
  warning: {
    100: '#FFF8CC',
    200: '#FFEF99',
    300: '#FFE466',
    400: '#FFD93F',
    500: '#FFC700',
    600: '#DBA600',
    700: '#B78600',
    800: '#936900',
    900: '#7A5400',
  },
  danger: {
    50: '#FFF4F1',
    100: '#FFEEDD',
    200: '#FFD9BB',
    300: '#FFBF99',
    400: '#FFA680',
    500: '#FF7D56',
    600: '#DB573E',
    700: '#B7372B',
    800: '#931D1B',
    900: '#7A1016',
  },
  black: {
    10: '#FFF',
    20: '#F9F9F9',
    30: '#EEE',
    40: '#E5E5E5',
    50: '#CCC',
    60: '#AAA',
    65: '#909090',
    70: '#757575',
    75: '#545454',
    80: '#333',
    85: '#1A1A1A',
    90: '#000',
  },
};

const fontSize = {
  h1: '4.8rem',
  h2: '4.0rem',
  h3: '3.2rem',
  h4: '2.8rem',
  h5: '2.4rem',
  h6: '2.0rem',
  lg: '1.8rem',
  base: '1.6rem',
  md: '1.4rem',
  sm: '1.2rem',
  xs: '1.0rem',
};

const deviceWidth = {
  mobile: '768px',
};

const fontWeight = {
  thin: '100',
  extraLight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

const iconSize = {
  sm: '2.5rem',
  md: '3.5rem',
  lg: '4.5rem',
  xl: '5.5rem',
};

export type ColorTypes = typeof color;
export type FontSizeTypes = typeof fontSize;
export type FontWeightTypes = typeof fontWeight;
export type DeviceWidthTypes = typeof deviceWidth;
export type IconSizeTypes = typeof iconSize;

export const theme: DefaultTheme = {
  color,
  fontSize,
  fontWeight,
  deviceWidth,
  iconSize,
};
