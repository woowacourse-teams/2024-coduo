import Tooltip from '@/components/common/Tooltip/Tooltip';
import { Direction } from '@/components/common/Tooltip/Tooltip.type';

import { theme } from '@/styles/theme';

import * as S from './Tooltip.styles';

interface ToolTipQuestionBoxProps {
  message: string;
  direction?: Direction;
  color?: string;
}

const ToolTipQuestionBox = ({
  direction = 'bottom',
  color = theme.color.primary[800],
  ...props
}: ToolTipQuestionBoxProps) => {
  return (
    <Tooltip direction={direction} color={color} {...props}>
      <S.QuestionIcon $color={color} />
    </Tooltip>
  );
};

export default ToolTipQuestionBox;
