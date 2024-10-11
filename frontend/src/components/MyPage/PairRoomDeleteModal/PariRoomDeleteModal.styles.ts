import styled from 'styled-components';

import Button from '@/components/common/Button/Button';

export const Description = styled.p`
  text-align: center;
`;

export const DangerText = styled.span`
  color: ${({ theme }) => theme.color.danger[600]};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.5;
`;

export const FilledButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.danger[600]};
  font-size: ${({ theme }) => theme.fontSize.md};
  border-color: ${({ theme }) => theme.color.danger[600]};

  &:hover {
    background-color: ${({ theme }) => theme.color.danger[700]};
    border-color: ${({ theme }) => theme.color.danger[700]};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.danger[800]};
    border-color: ${({ theme }) => theme.color.danger[800]};
  }
`;

export const OutlinedButton = styled(Button)`
  color: ${({ theme }) => theme.color.danger[600]};
  font-size: ${({ theme }) => theme.fontSize.md};
  border-color: ${({ theme }) => theme.color.danger[600]};

  &:hover {
    color: ${({ theme }) => theme.color.danger[700]};
    border-color: ${({ theme }) => theme.color.danger[700]};
  }

  &:active {
    color: ${({ theme }) => theme.color.danger[800]};
    border-color: ${({ theme }) => theme.color.danger[800]};
  }
`;
