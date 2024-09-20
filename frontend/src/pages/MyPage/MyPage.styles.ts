import styled, { keyframes } from 'styled-components';

const flow = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  padding: 5rem 26vw;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.h6};

  span {
    color: ${({ theme }) => theme.color.primary[600]};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const PairRoomButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  position: relative;

  width: 100%;
  padding: 3rem;
  border-radius: 1rem;

  font-size: ${({ theme }) => theme.fontSize.base};

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;
    border-radius: 1rem;

    background: linear-gradient(
      120deg,
      ${({ theme }) => theme.color.secondary[100]} 0 75%,
      ${({ theme }) => theme.color.secondary[600]} 75% 100%
    );
    opacity: 0.7;

    transition: opacity 0.2s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const PairRoleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AllText = styled.p`
  padding-bottom: 1.6rem;

  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const PairRoleText = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: ${({ theme }) => theme.fontSize.md};

  span {
    color: ${({ theme }) => theme.color.secondary[600]};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export const StatusText = styled.p`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.color.black[60]},
    ${({ theme }) => theme.color.black[70]},
    ${({ theme }) => theme.color.black[60]}
  );
  color: transparent;
  font-size: ${({ theme }) => theme.fontSize.base};
  letter-spacing: 0.15rem;

  animation: ${flow} 4s linear infinite;
  background-size: 200% 100%;
  background-clip: text;
`;

export const ConnectText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  color: ${({ theme }) => theme.color.black[10]};
`;

export const LeaveButton = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;

  color: ${({ theme }) => theme.color.black[50]};
  font-size: ${({ theme }) => theme.fontSize.md};

  transition: all 0.2s ease;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.black[60]};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
