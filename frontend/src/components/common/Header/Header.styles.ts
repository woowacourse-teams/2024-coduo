import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 7rem;
  padding: 0 5rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.color.black[30]};

  a,
  p {
    transition: all 0.1s;

    cursor: pointer;

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
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
`;

export const HowToPairLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    font-size: 0;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const LoginText = styled.p`
  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.base};

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const HowToPairTextLink = styled.div`
  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.base};

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

export const Username = styled.p`
  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.base};
`;
