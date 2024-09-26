import styled from 'styled-components';

export const Layout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  position: absolute;
  bottom: 0;

  width: 100%;
  height: 6rem;
  margin-top: auto;
  border-radius: 0 0 2rem 2rem;

  background-color: ${({ theme }) => theme.color.danger[200]};
  color: ${({ theme }) => theme.color.danger[600]};
  font-size: ${({ theme }) => theme.fontSize.base};

  cursor: pointer;
`;
