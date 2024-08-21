import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const SubTitle = styled.div`
  color: ${({ theme }) => theme.color.primary[600]};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 500;
`;
