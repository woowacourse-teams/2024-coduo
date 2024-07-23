import styled from 'styled-components';

import { Wave } from '@/assets';

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - 7rem);
  padding: 0 10.8vw;
  background-image: url(${Wave});
  background-repeat: no-repeat;
  background-size: contain;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  line-height: 1.3;

  span {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary[500]};
  font-size: 10rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  span {
    color: ${({ theme }) => theme.color.secondary[500]};
  }
`;

export const Info = styled.p`
  color: ${({ theme }) => theme.color.primary[700]};
  opacity: 50%;
  font-size: ${({ theme }) => theme.fontSize.h6};
  line-height: 1.5;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
