import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  width: 70rem;
  margin: 5rem 10rem;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.h6};

  span {
    color: ${({ theme }) => theme.color.primary[600]};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const AllText = styled.p`
  padding-bottom: 1.6rem;

  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const LeaveButton = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;

  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.md};

  transition: all 0.2s ease;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.black[70]};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
