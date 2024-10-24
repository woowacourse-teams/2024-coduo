import styled, { css } from 'styled-components';

export const buttonStyles = css`
  width: 8rem;
  border-color: ${({ theme }) => theme.color.black[50]};

  background-color: ${({ theme }) => theme.color.black[50]};
  font-size: ${({ theme }) => theme.fontSize.md};

  &:hover {
    border-color: ${({ theme }) => theme.color.black[60]};

    background-color: ${({ theme }) => theme.color.black[60]};
  }
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-bottom: 1rem;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const SubTitle = styled.div`
  color: ${({ theme }) => theme.color.primary[600]};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-bottom: 1rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const TextButton = styled.button`
  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-decoration: underline;

  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.color.black[65]};
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 4.2rem;
    height: 4rem;
    border-radius: 0.5rem 0 0 0.5rem;

    background-color: ${({ theme }) => theme.color.primary[800]};

    transition: all 0.2s;
  }

  p {
    display: flex;
    align-items: center;

    height: 4rem;
    padding: 1rem 2.5rem;
    border-radius: 0 0.5rem 0.5rem 0;

    background-color: ${({ theme }) => theme.color.primary[500]};
    color: ${({ theme }) => theme.color.black[10]};
    font-size: ${({ theme }) => theme.fontSize.md};

    transition: all 0.2s;
  }

  img {
    width: 2.2rem;
    height: 2.2rem;
  }

  &:hover {
    div {
      transform: scale(1.01);
    }

    p {
      background-color: ${({ theme }) => theme.color.primary[600]};

      transform: scale(1.01);
    }
  }
`;
