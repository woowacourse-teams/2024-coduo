import styled from 'styled-components';

export const Layout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 0.3rem;

  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};

  transition: all 0.3s;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.black[30]};
    color: ${({ theme }) => theme.color.primary[800]};
  }
`;
