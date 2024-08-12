import styled from 'styled-components';

type Role = 'DRIVER' | 'NAVIGATOR';

export const PairItem = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;

  height: 6rem;
  padding: 0 1.6rem;

  border-bottom: 1px solid ${({ theme }) => theme.color.black[40]};
`;

export const PairRole = styled.span<{ $role: Role }>`
  width: 7rem;
  padding: 0.4rem 0.8rem;
  border-radius: 1.2rem;

  background-color: ${({ theme, $role }) =>
    $role === 'DRIVER' ? theme.color.primary[500] : theme.color.secondary[500]};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: center;
`;

export const PairName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
`;
