import styled from 'styled-components';

const AnchorInteraction = styled.a`
  transition: all 0.1s;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

export const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  padding: 0 5rem;

  border-bottom: 0.3rem solid ${({ theme }) => theme.color.black[30]};
`;

export const LogoWrapper = styled(AnchorInteraction)``;

export const Logo = styled.img`
  height: 3.5rem;
`;

export const AnchorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
`;

export const HomeAnchor = styled(AnchorInteraction)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
`;

export const HowToPairAnchorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  @media (max-width: 768px) {
    font-size: 0;
  }
`;

export const HowToPairTextAnchor = styled(AnchorInteraction)`
  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.base};
  @media (max-width: 768px) {
    display: none;
  }
`;

export const HowToPairIconAnchor = styled(AnchorInteraction)`
  color: ${({ theme }) => theme.color.black[80]};
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
  }
`;
