import { DefaultTheme } from 'styled-components';

const color = {
  primary: {
    100: '#CFFFFA',
    200: '#A0FFF5',
    300: '#70FFF0',
    400: '#40FFEB',
    500: '#11FFE5',
    600: '#00E0C8',
    700: '#00B8A5',
    800: '#009181',
    900: '#00695E',
  },
  secondary: {
    100: '#FFF0D4',
    200: '#FFE1A9',
    300: '#FFD37E',
    400: '#FFC453',
    500: '#FFB526',
    600: '#F9A300',
    700: '#CC8600',
    800: '#9F6900',
    900: '#734B00',
  },
  success: {
    100: '#eaf8d5',
    200: '#d5f2ac',
    300: '#c0eb82',
    400: '#aae558',
    500: '#95de2f',
    600: '#7cbf1e',
    700: '#669d19',
    800: '#507b13',
    900: '#3a5a0e',
  },
  info: {
    100: '#c9d8ff',
    200: '#94b0ff',
    300: '#5e89ff',
    400: '#366bff',
    500: '#0d4eff',
    600: '#003de4',
    700: '#0032bb',
    800: '#002793',
    900: '#001c6a',
  },
  warning: {
    100: '#fff4cc',
    200: '#ffe999',
    300: '#ffdd66',
    400: '#ffd233',
    500: '#ffc700',
    600: '#d9a900',
    700: '#b38b00',
    800: '#8c6d00',
    900: '#665000',
  },
  danger: {
    100: '#ffd4c7',
    200: '#665000',
    300: '#ff7d56',
    400: '#ff5f2f',
    500: '#ff4007',
    600: '#df3300',
    700: '#b72a00',
    800: '#902100',
    900: '#681800',
  },
  black: {
    100: '#ffffff',
    200: '#dfdfdf',
    300: '#bfbfbf',
    400: '#9f9f9f',
    500: '#808080',
    600: '#606060',
    700: '#404040',
    800: '#202020',
    900: '#000000',
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
  sm: '1.6rem',
  md: '2rem',
  lg: '2.4rem',
  xl: '2.8rem',
};

const iconButtonSize = {
  sm: '2.4rem',
  md: '3rem',
  lg: '3.6rem',
  xl: '4.2rem',
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
  iconButtonSize,
};
