import styled from 'styled-components';

export const Layout = styled.button`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4.8rem;
  gap: 0.8rem;
  background-color: ${({ theme }) => theme.color.danger[200]};
  border-radius: 0 0 2rem 2rem;
  color: ${({ theme }) => theme.color.danger[600]};
  font-size: ${({ theme }) => theme.fontSize.md};
  cursor: pointer;
  margin-top: auto;
`;
