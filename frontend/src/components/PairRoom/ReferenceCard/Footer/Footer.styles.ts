import styled from 'styled-components';

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;
  min-height: 6rem;
  padding: 0 2rem;

  border-top: 1px solid ${({ theme }) => theme.color.black[100]};
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 80%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6rem;
`;
