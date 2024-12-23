import { AiFillQuestionCircle } from 'react-icons/ai';
import styled from 'styled-components';

export const QuestionIcon = styled(AiFillQuestionCircle)<{ $color: string }>`
  width: 2rem;
  height: 2rem;

  color: ${({ $color }) => $color};

  cursor: help;

  &:hover {
    transform: scale(1.1);
    transition: all 0.1s ease-out;
  }
`;
