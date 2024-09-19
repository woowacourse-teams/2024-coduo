import styled, { css } from 'styled-components';

export const buttonStyles = css`
  width: 100%;
  height: 10rem;
  border-color: ${({ theme }) => theme.color.black[70]};

  background-color: ${({ theme }) => theme.color.black[10]};
  color: ${({ theme }) => theme.color.black[70]};

  h2 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
  }

  &:hover {
    border-color: ${({ theme }) => theme.color.secondary[600]};

    background-color: ${({ theme }) => theme.color.black[10]};
    color: ${({ theme }) => theme.color.secondary[600]};
  }
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  padding: 5rem 30vw;
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
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
