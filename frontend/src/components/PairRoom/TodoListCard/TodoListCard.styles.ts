import styled, { css } from 'styled-components';

export const Layout = styled.div`
  min-width: 49rem;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 25rem);
  min-height: 42rem;
`;

export const TodoListWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;

  padding: 2rem;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 6rem;

  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
`;

export const inputStyles = css`
  height: 4rem;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const AddButton = styled.button`
  display: flex;
  gap: 1rem;
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.color.black[70]};

  border-radius: 0 0 1.5rem 1.5rem;

  transition: all 0.2s ease 0s;

  &:hover {
    background-color: ${({ theme }) => theme.color.black[20]};
  }
`;

export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.black[60]};
`;
