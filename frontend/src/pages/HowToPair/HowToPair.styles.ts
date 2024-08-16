import styled from 'styled-components';

import { Wave } from '@/assets';

export const Layout = styled.div`
  position: relative;

  padding: 4rem;

  background: no-repeat url(${Wave});
  color: ${({ theme }) => theme.color.black[80]};
  line-height: 1.2;
  background-size: contain;
`;

export const Title = styled.h1`
  padding: 1rem 0;

  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Section = styled.section`
  padding: 1.2rem 2rem;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Paragraph = styled.p`
  margin: 1rem 0;

  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 2;
`;

export const List = styled.ul`
  padding: 2rem 0;

  font-size: ${({ theme }) => theme.fontSize.base};
  list-style-type: none;
`;

export const ListItem = styled.li`
  position: relative;

  margin-bottom: 0.5rem;
  padding-left: 1.5rem;

  &::before {
    content: '•';

    position: absolute;
    left: 0;

    color: ${({ theme }) => theme.color.primary[800]};
  }
`;

export const Strong = styled.strong`
  color: ${({ theme }) => theme.color.primary[700]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Conclusion = styled.p`
  margin-top: 2rem;
  padding-left: 1rem;

  color: ${({ theme }) => theme.color.primary[800]};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSize.base};

  border-left: 4px solid ${({ theme }) => theme.color.primary[300]};
`;
