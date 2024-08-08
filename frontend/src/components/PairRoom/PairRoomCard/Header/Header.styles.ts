import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 7rem;
  padding: 2rem;

  font-size: ${({ theme }) => theme.fontSize.h6};

  border-bottom: 1px solid ${({ theme }) => theme.color.black[30]};
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
