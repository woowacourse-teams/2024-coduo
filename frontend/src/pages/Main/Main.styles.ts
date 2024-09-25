import styled, { css } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  overflow: hidden;

  position: relative;

  min-height: calc(100vh - 7rem);
  padding: 8rem 10.8vw;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    flex-direction: column;
    gap: 8rem;

    min-height: 0;
    padding: 8rem 5.4vw;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    align-items: center;
    gap: 4rem;

    text-align: center;
  }
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  line-height: 1.4;

  span {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.h4};
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary[500]};
  font-size: 9rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  span {
    color: ${({ theme }) => theme.color.secondary[500]};
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    font-size: 8rem;
  }
`;

export const Info = styled.p`
  opacity: 0.5;
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    display: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

export const buttonStyles = css`
  width: 24rem;
  height: 6rem;

  font-size: ${({ theme }) => theme.fontSize.h6};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 100%;
    min-width: 18rem;
    max-height: 5rem;

    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;
