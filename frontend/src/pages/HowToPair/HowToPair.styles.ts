import styled from 'styled-components';

import { Wave } from '@/assets';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20rem;
  overflow-x: hidden;

  position: relative;

  padding: 16rem 4rem;

  color: ${({ theme }) => theme.color.black[80]};
  line-height: 1.2;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;

    background: url(${Wave}) repeat-y;
    opacity: 0.5;
    content: '';
    background-size: cover;
  }
`;

export const Section = styled.section<{ $textAlign?: 'left' | 'center' | 'right' }>`
  display: flex;
  flex-direction: row;

  width: 100%;
  border-radius: 1rem;

  text-align: ${({ $textAlign = 'left' }) => $textAlign};
`;

export const TextBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5rem;

  & > * {
    flex-basis: 0;

    flex-grow: 1;
  }
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 2rem 4rem;
  border-radius: 3rem;

  background-color: #ffeeb4;
`;

export const SectionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
`;

export const SectionTitle = styled.h2`
  margin: 5rem 0;

  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Paragraph = styled.p`
  margin: 1rem 0;

  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.h6};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 2;
`;

export const Strong = styled.strong`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.h4};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
`;

export const Highlighted = styled.span`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
`;

export const Conclusion = styled.p`
  margin-top: 2rem;
  padding-left: 1rem;

  color: ${({ theme }) => theme.color.primary[800]};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: 1.5;
  text-align: center;
`;

export const Character = styled.img<{ $right?: string; $bottom?: string; $left?: string }>`
  position: relative;
  right: ${({ $right }) => $right};
  bottom: ${({ $bottom }) => $bottom};
  left: ${({ $left }) => $left};

  width: 36rem;
  height: 36rem;
`;
