import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Sidebar = styled.div<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  transition: width 0.3s;
  overflow: hidden;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
`;

export const RoomCode = styled.span`
  margin-left: auto;
  font-weight: bold;
`;

export const CopyButton = styled.button`
  margin-left: 8px;
  background-color: #e9ecef;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
`;

export const PairList = styled.div`
  padding: 16px;
`;

export const PairItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const PairRole = styled.span`
  background-color: #d1e7dd;
  padding: 4px 8px;
  border-radius: 12px;
  margin-right: 8px;
`;

export const PairName = styled.span`
  font-weight: bold;
`;

export const DeleteButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #f8d7da;
  border: none;
  color: #721c24;
  cursor: pointer;
  margin-top: auto;
`;
