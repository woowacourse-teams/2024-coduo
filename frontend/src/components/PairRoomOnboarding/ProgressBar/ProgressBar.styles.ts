import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 3rem;
    height: 3rem;

    cursor: default;

    &:hover {
      background-color: ${({ theme }) => theme.color.primary[500]};
    }

    &:active {
      background-color: ${({ theme }) => theme.color.primary[500]};
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.4rem;
`;

export const ButtonLabel = styled.p`
  min-width: 5rem;

  color: ${({ theme }) => theme.color.primary[800]};
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fontWeight.light};
  text-align: center;
`;

export const ProgressLine = styled.div<{ $isRoleSelected: boolean }>`
  width: 20rem;
  height: 3.5rem;
  border-top: 0.15rem dashed ${({ theme }) => theme.color.primary[500]};
`;
