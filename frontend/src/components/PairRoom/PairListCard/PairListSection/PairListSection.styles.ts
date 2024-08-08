import styled from 'styled-components';

type Role = 'DRIVER' | 'NAVIGATOR';

export const PairItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: start;

  height: 6rem;
  padding: 0 1.6rem;

  border-bottom: 1px solid ${({ theme }) => theme.color.black[40]};
`;

export const PairRole = styled.span<{ $role: Role }>`
  width: 7rem;
  padding: 0.4rem 0.8rem;

  font-size: ${({ theme }) => theme.fontSize.sm};
  color: white;
  text-align: center;

  background-color: ${({ theme, $role }) =>
    $role === 'DRIVER' ? theme.color.primary[500] : theme.color.secondary[500]};
  border-radius: 1.2rem;
`;

export const PairName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
`;
