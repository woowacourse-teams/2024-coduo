import { ReactNode } from 'react';

import { Direction } from '@/components/common/Tooltip/Tooltip.type';

import { theme } from '@/styles/theme';

import * as S from './Tooltip.styles';

interface ToolTipProps {
  message: string;
  children?: ReactNode;
  direction?: Direction;
  color?: string;
}

const Tooltip = ({ children, message, direction = 'bottom', color = theme.color.primary[800] }: ToolTipProps) => {
  return (
    <S.Box>
      {children}
      <S.Content className="tooltip" $color={color} $direction={direction}>
        {message}
      </S.Content>
    </S.Box>
  );
};

export default Tooltip;
