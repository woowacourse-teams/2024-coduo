import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 7rem;
  padding: 0 5rem;

  border-bottom: 0.3rem solid ${({ theme }) => theme.color.black[30]};

  a {
    cursor: pointer;
    transition: all 0.1s;

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 0.5;
    }
  }
`;

export const Logo = styled.img`
  height: 3.5rem;
`;

export const AnchorContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
`;

export const HomeAnchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ theme }) => theme.iconSize.md};
  height: ${({ theme }) => theme.iconSize.md};
`;

export const HowToPairAnchorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    font-size: 0;
  }
`;

export const HowToPairTextAnchor = styled.a`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.color.black[80]};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    display: none;
  }
`;

export const HowToPairIconAnchor = styled.a`
  display: none;
  color: ${({ theme }) => theme.color.black[80]};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    display: block;
  }
`;
