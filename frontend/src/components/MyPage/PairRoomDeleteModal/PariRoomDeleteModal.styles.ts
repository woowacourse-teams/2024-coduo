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
  border-color: ${({ theme }) => theme.color.danger[600]};

  background-color: ${({ theme }) => theme.color.danger[600]};
  font-size: ${({ theme }) => theme.fontSize.md};

  &:hover {
    border-color: ${({ theme }) => theme.color.danger[700]};

    background-color: ${({ theme }) => theme.color.danger[700]};
  }

  &:active {
    border-color: ${({ theme }) => theme.color.danger[800]};

    background-color: ${({ theme }) => theme.color.danger[800]};
  }
`;

export const OutlinedButton = styled(Button)`
  border-color: ${({ theme }) => theme.color.danger[600]};

  color: ${({ theme }) => theme.color.danger[600]};
  font-size: ${({ theme }) => theme.fontSize.md};

  &:hover {
    border-color: ${({ theme }) => theme.color.danger[700]};

    color: ${({ theme }) => theme.color.danger[700]};
  }

  &:active {
    border-color: ${({ theme }) => theme.color.danger[800]};

    color: ${({ theme }) => theme.color.danger[800]};
  }
`;
