import Tooltip from '@/components/common/Tooltip/Tooltip';
import { Direction } from '@/components/common/Tooltip/Tooltip.type';

import { theme } from '@/styles/theme';

import * as S from './ToolTipQuestionBox.styles';

interface ToolTipQuestionBoxProps {
  message: string;
  color?: string;
  boxColor?: string;
  boxDirection?: Direction;
}

const ToolTipQuestionBox = ({
  color = theme.color.primary[800],
  boxColor = theme.color.primary[800],
  boxDirection = 'bottom',
  ...props
}: ToolTipQuestionBoxProps) => {
  return (
    <Tooltip direction={boxDirection} color={boxColor} {...props}>
      <S.QuestionIcon $color={color} />
    </Tooltip>
  );
};

export default ToolTipQuestionBox;
