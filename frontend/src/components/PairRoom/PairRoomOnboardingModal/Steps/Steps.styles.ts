import styled from 'styled-components';

export const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: start;
  gap: 1.6rem 0;
  background-color: ${({ theme }) => theme.color.primary[200]};
  padding: 1.6rem;
  border-radius: 1.2rem;
  margin: 2rem 0;
`;

export const InformationTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.primary[700]};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const InformationDescription = styled.p`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.black[70]};
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin: 0 0 12rem 0;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

export const DropdownLabel = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.primary[700]};
  margin-bottom: 0.5rem;
`;
