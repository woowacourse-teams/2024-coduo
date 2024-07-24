import { IoMdSwap } from 'react-icons/io';
import styled, { css } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  height: 16rem;
`;

export const RoleBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100%;
`;

const RoleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  width: 20rem;
  height: 11rem;
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
  align-items: center;
  gap: 0.6rem;

  p {
    font-size: ${({ theme }) => theme.fontSize.h3};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const RoleLabel = styled.div`
  width: 8rem;
  padding: 0.4rem 0;
  color: ${({ theme }) => theme.color.black[10]};
  border-radius: 10rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: center;
`;

export const DriverLabel = styled(RoleLabel)`
  background-color: ${({ theme }) => theme.color.secondary[550]};
`;

export const NavigatorLabel = styled(RoleLabel)`
  background-color: ${({ theme }) => theme.color.primary[700]};
`;

export const DriverText = styled.p`
  color: ${({ theme }) => theme.color.secondary[800]};
`;

export const NavigatorText = styled.p`
  color: ${({ theme }) => theme.color.primary[800]};
`;

export const buttonStyle = css`
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  border-color: ${({ theme }) => theme.color.secondary[100]};
  background-color: ${({ theme }) => theme.color.secondary[100]};

  &:hover {
    border-color: ${({ theme }) => theme.color.secondary[200]};
    background-color: ${({ theme }) => theme.color.secondary[200]};
  }
`;

export const SwapIcon = styled(IoMdSwap)`
  color: ${({ theme }) => theme.color.secondary[500]};
  font-size: ${({ theme }) => theme.fontSize.h5};
`;
