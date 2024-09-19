import { BsArrowReturnRight } from 'react-icons/bs';
import styled from 'styled-components';

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
  gap: 1.4rem;
`;

export const RepositoryNameBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: relative;

  width: 30rem;
  height: 4rem;
  padding: 0 1.5rem;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.color.black[80]};
  color: ${({ theme }) => theme.color.black[10]};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const GithubLogo = styled.img`
  position: absolute;
  left: -2rem;

  width: 5rem;
  object-fit: cover;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const ArrowIcon = styled(BsArrowReturnRight)`
  margin-top: 0.8rem;

  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;
