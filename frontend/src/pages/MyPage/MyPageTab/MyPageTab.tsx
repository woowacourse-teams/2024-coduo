import { CurrentTabType } from '@/pages/MyPage/MyPage.type';

import { TAB_CONFIG } from '@/constants/mypage';

import * as S from './MyPageTab.styles';
interface MyPageTabProps {
  length: number[];
  currentTab: CurrentTabType;
  handleTabClick: (tabKey: CurrentTabType) => void;
}
const MyPageTab = ({ length, currentTab, handleTabClick }: MyPageTabProps) => {
  return (
    <S.Layout>
      {TAB_CONFIG.map((tab, index) => (
        <S.Tab key={tab.key} onClick={() => handleTabClick(tab.key)} $isActive={currentTab === tab.key}>
          <p>
            {tab.title} ({length[index]})
          </p>
        </S.Tab>
      ))}
    </S.Layout>
  );
};
export default MyPageTab;
