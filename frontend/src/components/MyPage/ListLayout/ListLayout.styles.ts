import styled from 'styled-components';

export const EmptyText = styled.p`
  margin-top: 5rem;

  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.base};
`;
