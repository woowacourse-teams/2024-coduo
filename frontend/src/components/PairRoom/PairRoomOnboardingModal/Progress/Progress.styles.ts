import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  Button {
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

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.4rem;
`;

export const ButtonLabel = styled.p`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fontWeight.light};
  min-width: 5rem;
  text-align: center;
  color: ${({ theme }) => theme.color.primary[800]};
`;

export const ProgressLine = styled.div<{ $isRoleSelected: boolean }>`
  width: 30%;
  height: 3.5rem;
  border-top: 0.15rem dashed
    ${({ $isRoleSelected, theme }) => ($isRoleSelected ? theme.color.primary[500] : theme.color.black[40])};

  transition: all 0.3s ease-in-out;
`;
