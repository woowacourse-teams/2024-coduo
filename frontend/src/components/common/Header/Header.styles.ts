import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 7rem;
  padding: 0 5rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.color.black[30]};

  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.base};

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    transition: all 0.1s;

    cursor: pointer;

    &:hover {
      opacity: 0.7;
      text-decoration: underline;
    }

    &:active {
      opacity: 0.5;
      text-decoration: underline;
    }
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    padding: 0 8vw;
  }
`;

export const Logo = styled.img`
  width: 3.6rem;
  height: 3.6rem;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.4rem;
`;

export const HowToPairText = styled.button`
  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    display: none;
  }
`;

export const HowToPairIcon = styled.div`
  display: none;

  color: ${({ theme }) => theme.color.primary[800]};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    display: flex;
    align-items: center;
  }
`;
