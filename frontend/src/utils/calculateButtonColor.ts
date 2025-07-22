import { css } from 'styled-components';

import { theme } from '@/styles/theme';

// Hex/Int 변환
const HEX_RADIX = 16;
const HEX_COLOR_LENGTH = 6;
const PADDING_CHAR = '0';
const MIN_INT_COLOR = 0;
const MAX_INT_COLOR = 16777215; // 0xFFFFFF

// RGB값 계산
const MIN_RGB_VALUE = 0;
const MAX_RGB_VALUE = 255;
const RED_BIT_SHIFT = 16;
const GREEN_BIT_SHIFT = 8;
const COLOR_COMPONENT_MASK = 0xff; // 255

// 명도 계산
const LUMINANCE_RED_COEFFICIENT = 0.2126;
const LUMINANCE_GREEN_COEFFICIENT = 0.7152;
const LUMINANCE_BLUE_COEFFICIENT = 0.0722;
const SRGB_ADJUSTMENT_THRESHOLD = 0.03928;
const SRGB_ADJUSTMENT_DIVISOR = 12.92;
const SRGB_ADJUSTMENT_BASE = 0.055;
const SRGB_ADJUSTMENT_ADDITIVE_FACTOR = 1.055;
const SRGB_ADJUSTMENT_POWER = 2.4;

// 버튼 색 계산
const LUMINANCE_THRESHOLD = 0.5;
const HIGH_LUMINANCE_BOUNDARY = 0.8;
const LOW_LUMINANCE_BOUNDARY = 0.2;
const LIGHTEN_DIRECTION = 1;
const DARKEN_DIRECTION = -1;
const NORMAL_BRIGHTNESS_ADJUSTMENT = 20;
const LARGE_BRIGHTNESS_ADJUSTMENT = 40;

const intToHexColor = (decimal: number) => {
  const rrggbb = (PADDING_CHAR.repeat(HEX_COLOR_LENGTH) + decimal.toString(HEX_RADIX)).slice(-HEX_COLOR_LENGTH);
  return `#${rrggbb}`;
};

const hexColorToInt = (hexDecimalColor: string) => {
  const int = parseInt(hexDecimalColor.slice(1), HEX_RADIX);

  if (int < MIN_INT_COLOR) {
    return MIN_INT_COLOR;
  }
  if (int > MAX_INT_COLOR) {
    return MAX_INT_COLOR;
  }

  return int;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const adjustBrightness = (hexColor: string, amount: number) => {
  const color = hexColor.slice(1);
  const num = parseInt(color, HEX_RADIX);

  let red = (num >> RED_BIT_SHIFT) + amount;
  let green = ((num >> GREEN_BIT_SHIFT) & COLOR_COMPONENT_MASK) + amount;
  let blue = (num & COLOR_COMPONENT_MASK) + amount;

  red = clamp(red, MIN_RGB_VALUE, MAX_RGB_VALUE);
  green = clamp(green, MIN_RGB_VALUE, MAX_RGB_VALUE);
  blue = clamp(blue, MIN_RGB_VALUE, MAX_RGB_VALUE);

  const newColor = (red << RED_BIT_SHIFT) | (green << GREEN_BIT_SHIFT) | blue;
  return `#${newColor.toString(HEX_RADIX).padStart(HEX_COLOR_LENGTH, PADDING_CHAR)}`;
};

const calculateLuminance = (hexColor: string) => {
  const color = hexColor.slice(1);
  const red = parseInt(color.substring(0, 2), HEX_RADIX) / MAX_RGB_VALUE;
  const green = parseInt(color.substring(2, 4), HEX_RADIX) / MAX_RGB_VALUE;
  const blue = parseInt(color.substring(4, 6), HEX_RADIX) / MAX_RGB_VALUE;

  const adjustChannel = (value: number) =>
    value <= SRGB_ADJUSTMENT_THRESHOLD
      ? value / SRGB_ADJUSTMENT_DIVISOR
      : Math.pow((value + SRGB_ADJUSTMENT_BASE) / SRGB_ADJUSTMENT_ADDITIVE_FACTOR, SRGB_ADJUSTMENT_POWER);

  const adjusted = [red, green, blue].map(adjustChannel);

  return (
    LUMINANCE_RED_COEFFICIENT * adjusted[0] +
    LUMINANCE_GREEN_COEFFICIENT * adjusted[1] +
    LUMINANCE_BLUE_COEFFICIENT * adjusted[2]
  );
};

export const calculateButtonColor = (color: string, filled: boolean) => {
  const isThemeColor = color in theme.color;
  const colorKey = isThemeColor ? (color as keyof typeof theme.color) : null;

  const getColor = (shade: number, fallback: string) => {
    if (isThemeColor && colorKey) {
      const colorPalette = theme.color[colorKey] as Record<number, string>;
      return colorPalette[shade];
    }
    return fallback;
  };

  const baseColor = intToHexColor(hexColorToInt(color));
  const baseLuminance = calculateLuminance(baseColor);
  const adjustmentDirection = baseLuminance > LUMINANCE_THRESHOLD ? DARKEN_DIRECTION : LIGHTEN_DIRECTION;

  const adjustmentAmount =
    baseLuminance > HIGH_LUMINANCE_BOUNDARY || baseLuminance < LOW_LUMINANCE_BOUNDARY
      ? LARGE_BRIGHTNESS_ADJUSTMENT
      : NORMAL_BRIGHTNESS_ADJUSTMENT;

  const hoverColor = adjustBrightness(baseColor, adjustmentDirection * adjustmentAmount);
  const activeColor = adjustBrightness(hoverColor, adjustmentDirection * adjustmentAmount);

  return {
    base: css`
      border-color: ${getColor(colorKey === 'primary' ? 600 : 400, baseColor)};

      background-color: ${filled ? getColor(colorKey === 'primary' ? 600 : 400, baseColor) : theme.color.black[0]};
      color: ${filled ? theme.color.black[0] : getColor(colorKey === 'primary' ? 600 : 400, baseColor)};
    `,
    hover: css`
      border-color: ${getColor(colorKey === 'primary' ? 700 : 500, hoverColor)};

      background-color: ${filled ? getColor(colorKey === 'primary' ? 700 : 500, hoverColor) : theme.color.black[0]};
      color: ${filled ? theme.color.black[0] : getColor(colorKey === 'primary' ? 700 : 500, hoverColor)};
    `,
    active: css`
      border-color: ${getColor(colorKey === 'primary' ? 800 : 600, activeColor)};

      background-color: ${filled ? getColor(colorKey === 'primary' ? 800 : 600, activeColor) : theme.color.black[0]};
      color: ${filled ? theme.color.black[0] : getColor(colorKey === 'primary' ? 800 : 600, activeColor)};
    `,
    disabled: css`
      border-color: ${theme.color.black[300]};

      background-color: ${theme.color.black[300]};
      color: ${theme.color.black[0]};
    `,
  };
};
