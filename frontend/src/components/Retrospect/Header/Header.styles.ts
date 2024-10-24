import styled, { css } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.p`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h6};
`;

export const ButtonStyle = css`
  width: 10rem;
  border-color: ${({ theme }) => theme.color.primary[700]};

  color: ${({ theme }) => theme.color.primary[700]};

  &:hover {
    border-color: ${({ theme }) => theme.color.primary[800]};

    color: ${({ theme }) => theme.color.primary[800]};
  }
`;
