import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  width: 100%;
  padding: 4rem 0;
`;

export const DropdownContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
`;

export const DropdownLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 500;
  color: ${({ theme }) => theme.color.primary[700]};
`;
