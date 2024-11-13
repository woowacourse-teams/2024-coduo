import { css } from 'styled-components';

import { theme } from '@/styles/theme';

const intToHexColor = (decimal: number) => {
  const rrggbb = ('000000' + decimal.toString(16)).slice(-6);
  return '#' + rrggbb;
};

const hexColorToInt = (hexDecimalColor: string) => {
  const min = 0;
  const max = 16777215;
  const int = parseInt(hexDecimalColor.slice(1, 8), 16);

  if (int < min) {
    return min;
  }
  if (int > max) {
    return max;
  }

  return int;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const adjustBrightness = (hexColor: string, amount: number) => {
  const color = hexColor.slice(1);
  const num = parseInt(color, 16);

  let red = (num >> 16) + amount;
  let green = ((num >> 8) & 0x00ff) + amount;
  let blue = (num & 0x0000ff) + amount;

  red = clamp(red, 0, 255);
  green = clamp(green, 0, 255);
  blue = clamp(blue, 0, 255);

  const newColor = (red << 16) | (green << 8) | blue;
  return `#${newColor.toString(16).padStart(6, '0')}`;
};

const calculateLuminance = (hexColor: string) => {
  const color = hexColor.slice(1);
  const red = parseInt(color.substring(0, 2), 16) / 255;
  const green = parseInt(color.substring(2, 4), 16) / 255;
  const blue = parseInt(color.substring(4, 6), 16) / 255;

  const adjusted = [red, green, blue].map((value) =>
    value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * adjusted[0] + 0.7152 * adjusted[1] + 0.0722 * adjusted[2];
};

export const calculateButtonColor = (color: string, filled: boolean) => {
  const isThemeColor = color in theme.color;
  const colorKey = isThemeColor ? (color as keyof typeof theme.color) : null;

  const getColor = (shade: number, fallback: string) => {
    const colorPalette = theme.color[colorKey!] as Record<number, string>;
    return isThemeColor ? colorPalette[shade] : fallback;
  };

  const baseColor = intToHexColor(hexColorToInt(color));
  const baseLuminance = calculateLuminance(baseColor);
  const adjustmentDirection = baseLuminance > 0.5 ? -1 : 1;

  const adjustmentAmount = baseLuminance > 0.8 || baseLuminance < 0.2 ? 40 : 20;

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
