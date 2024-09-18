import { AiFillCopy } from 'react-icons/ai';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  position: relative;

  padding: 3rem 4rem;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.color.primary[100]};
`;

export const Content = styled.p`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const CopyIcon = styled(AiFillCopy)`
  position: absolute;
  top: 1rem;
  right: 1rem;

  color: ${({ theme }) => theme.color.primary[300]};
  font-size: 2rem;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.primary[400]};

    transform: scale(1.03);
  }

  &:active {
    color: ${({ theme }) => theme.color.primary[500]};

    transform: scale(1.06);
  }
`;
