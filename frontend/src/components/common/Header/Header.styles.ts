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

export const LinkContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
`;

export const HomeLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ theme }) => theme.iconSize.md};
  height: ${({ theme }) => theme.iconSize.md};
`;

export const HowToPairLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    font-size: 0;
  }
`;

export const HowToPairTextLink = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.color.black[80]};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    display: none;
  }
`;

export const HowToPairIconLink = styled.div`
  display: none;
  color: ${({ theme }) => theme.color.black[80]};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    display: block;
  }
`;
