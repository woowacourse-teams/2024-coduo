import styled from 'styled-components';

type Role = 'driver' | 'navigator';

export const Layout = styled.div`
  padding: 1.6rem;
`;

export const PairItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 4.8rem;
  gap: 1.2rem;
`;

export const PairRole = styled.span<{ $role: Role }>`
  padding: 0.4rem 0.8rem;
  border-radius: 1.2rem;
  width: 6rem;
  text-align: center;
  background-color: ${({ theme, $role }) =>
    $role === 'driver' ? theme.color.primary[500] : theme.color.secondary[500]};
  color: white;
`;

export const PairName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
`;
