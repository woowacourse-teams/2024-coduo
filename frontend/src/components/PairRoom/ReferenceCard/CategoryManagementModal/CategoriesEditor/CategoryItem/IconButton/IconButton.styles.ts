import styled from 'styled-components';

export const IconsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  border-radius: 0.3rem;

  color: ${({ theme }) => theme.color.primary[700]};

  transition: all 0.3s;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.black[30]};
    color: ${({ theme }) => theme.color.primary[800]};
  }
`;
