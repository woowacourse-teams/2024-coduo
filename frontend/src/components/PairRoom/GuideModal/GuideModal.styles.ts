import styled, { css } from 'styled-components';

export const buttonStyles = css`
  width: 9rem;
  height: 3.2rem;
  border-color: ${({ theme }) => theme.color.danger[400]};
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.color.danger[400]};
  font-size: ${({ theme }) => theme.fontSize.md};

  &:hover {
    border-color: ${({ theme }) => theme.color.danger[500]};

    background-color: ${({ theme }) => theme.color.danger[500]};
  }

  &:active {
    border-color: ${({ theme }) => theme.color.danger[500]};

    background-color: ${({ theme }) => theme.color.danger[500]};
  }
`;

export const startButtonStyles = css`
  width: 18rem;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 1rem 0;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Question = styled.p`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-size: ${({ theme }) => theme.fontSize.base};
`;

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  height: 5.2rem;
  padding: 1rem 1rem 1rem 1.6rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.danger[100]};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  p {
    color: ${({ theme }) => theme.color.black[60]};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;
