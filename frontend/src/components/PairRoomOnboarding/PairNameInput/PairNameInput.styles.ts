import styled, { css } from 'styled-components';

export const buttonStyles = css`
  width: 8rem;
  height: 4rem;
  border-color: ${({ theme }) => theme.color.black[50]};

  background-color: ${({ theme }) => theme.color.black[50]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4.2rem;
  height: 4rem;
  border-radius: 0.5rem 0 0 0.5rem;

  background-color: ${({ theme }) => theme.color.primary[800]};

  img {
    width: 2.2rem;
    height: 2.2rem;
  }
`;

export const AddText = styled.p`
  display: flex;
  align-items: center;

  height: 4rem;
  padding: 1rem 2rem;
  border-radius: 0 0.5rem 0.5rem 0;

  background-color: ${({ theme }) => theme.color.primary[500]};
  color: ${({ theme }) => theme.color.black[10]};
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

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const NameText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
`;
