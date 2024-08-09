import styled from 'styled-components';

export const RoleTitle = styled.p`
  margin-bottom: 0.5em;
  font-size: 1.2em;
  font-weight: bold;
  color: ${({ theme }) => theme.color.primary[800]};
`;

export const RoleDescription = styled.p`
  margin-bottom: 1em;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.black[80]};
`;

export const GeneralAdvice = styled.p`
  margin-top: 1em;
  margin-bottom: 0.5em;

  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.primary[800]};
`;

export const AdviceDescription = styled.p`
  margin-bottom: 1em;
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  line-height: 1.5;
`;
