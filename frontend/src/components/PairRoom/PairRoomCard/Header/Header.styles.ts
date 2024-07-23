import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
  font-size: ${({ theme }) => theme.fontSize.h6};
  border-bottom: 1px solid ${({ theme }) => theme.color.black[30]};
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
