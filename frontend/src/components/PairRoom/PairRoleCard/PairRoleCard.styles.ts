import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;

  min-width: 60rem;
  min-height: 14rem;
`;

export const RoleBoxContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;

  height: 100%;
  padding: 2rem;
`;

const RoleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  width: 18rem;
  height: 9.4rem;
  padding: 1.6rem 2.4rem;
  border-radius: 2rem;
`;

export const DriverBox = styled(RoleBox)`
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.color.secondary[100]},
    ${({ theme }) => theme.color.secondary[300]}
  );
`;

export const NavigatorBox = styled(RoleBox)`
  background: linear-gradient(180deg, ${({ theme }) => theme.color.black[30]}, ${({ theme }) => theme.color.black[50]});
`;

export const RoleIcon = styled.p`
  font-size: ${({ theme }) => theme.fontSize.h2};
`;

export const RoleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;

  p {
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const RoleLabel = styled.div`
  width: 8rem;
  padding: 0.4rem 0;
  border-radius: 10rem;

  color: ${({ theme }) => theme.color.black[10]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: center;
`;

export const DriverLabel = styled(RoleLabel)`
  background-color: ${({ theme }) => theme.color.secondary[600]};
`;

export const NavigatorLabel = styled(RoleLabel)`
  background-color: ${({ theme }) => theme.color.primary[700]};
`;

export const DriverText = styled.p`
  color: ${({ theme }) => theme.color.secondary[900]};
`;

export const NavigatorText = styled.p`
  color: ${({ theme }) => theme.color.primary[800]};
`;
