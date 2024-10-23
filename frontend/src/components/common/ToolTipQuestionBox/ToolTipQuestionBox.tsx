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
      <S.QuestionIcon
        $color={color}
        aria-roledescription="tooltip"
        aria-label="페어 프로그래밍을 위해 필요한 할 일 목록을 작성해 보세요. 할 일을 더욱 효율적으로 관리할 수 있습니다."
      />
    </Tooltip>
  );
};

export default ToolTipQuestionBox;
