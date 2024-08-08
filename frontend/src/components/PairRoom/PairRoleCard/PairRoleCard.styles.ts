import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  min-width: 60rem;
  height: 16rem;
`;

export const RoleBoxContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-evenly;

  height: 100%;
  padding: 3rem;
`;

const RoleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 20rem;
  height: 11rem;
  padding: 2rem 3rem;

  border-radius: 3rem;
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
  gap: 0.6rem;
  align-items: center;

  p {
    font-size: ${({ theme }) => theme.fontSize.h3};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const RoleLabel = styled.div`
  width: 8rem;
  padding: 0.4rem 0;

  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.black[10]};
  text-align: center;

  border-radius: 10rem;
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
