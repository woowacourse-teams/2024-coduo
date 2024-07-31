import styled from 'styled-components';

export const Layout = styled.button`
  cursor: pointer;

  position: absolute;
  bottom: 0;

  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 7rem;
  margin-top: auto;

  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.color.danger[600]};

  background-color: ${({ theme }) => theme.color.danger[200]};
  border-radius: 0 0 2rem 2rem;
`;
