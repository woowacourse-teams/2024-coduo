import styled from 'styled-components';

export const TodoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 7rem;
  max-height: 7rem;

  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
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
  height: 7rem;
  padding: 2rem;

  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.color.black[70]};

  border-radius: 0 0 1.5rem 1.5rem;

  transition: all 0.2s ease 0s;

  &:hover {
    background-color: ${({ theme }) => theme.color.black[20]};
  }
`;
