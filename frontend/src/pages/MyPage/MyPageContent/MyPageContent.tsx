import { useState } from 'react';

import { CurrentTabType } from '@/pages/MyPage/MyPage.type';
import ListLayout from '@/pages/MyPage/MyPageContent/ListLayout/ListLayout';
import MyPageTab from '@/pages/MyPage/MyPageTab/MyPageTab';

import PairRoomButton from '@/components/MyPage/PairRoomButton/PairRoomButton';
import RetrospectButton from '@/components/MyPage/PairRoomButton/RetrospectButton';

import { useMyPairRooms } from '@/queries/MyPage/useMyPairRooms';
import { useGetRetrospects } from '@/queries/Retrospect/useGetRetrospects';

import { TAB_CONFIG } from '@/constants/mypage';

const MyPageContent = () => {
  const [currentTab, setCurrentTab] = useState<CurrentTabType>('pairRoom');

  const handleTabClick = (tabKey: CurrentTabType) => {
    setCurrentTab(tabKey);
  };

  const { myPairRoomList, myPairRoomLoading } = useMyPairRooms();
  const { myRetrospects, myRetrospectLoading } = useGetRetrospects();

  const myPairRoomLength = myPairRoomList?.length || 0;
  const myRetrospectsLength = myRetrospects?.length || 0;

  return (
    <>
      <MyPageTab
        length={[myPairRoomLength, myRetrospectsLength]}
        currentTab={currentTab}
        handleTabClick={handleTabClick}
      />

      {currentTab === TAB_CONFIG[0].key && (
        <ListLayout length={myPairRoomLength} emptyMessage="생성한 페어룸이 없습니다." isFetching={myPairRoomLoading}>
          {myPairRoomList?.map((pairRoom) => (
            <PairRoomButton
              key={pairRoom.id}
              driver={pairRoom.driver}
              navigator={pairRoom.navigator}
              status={pairRoom.status}
              accessCode={pairRoom.accessCode}
            />
          ))}
        </ListLayout>
      )}
      {currentTab === TAB_CONFIG[1].key && (
        <ListLayout
          length={myRetrospectsLength}
          emptyMessage="작성한 회고가 없습니다."
          isFetching={myRetrospectLoading}
        >
          {myRetrospects?.map((retrospect) => (
            <RetrospectButton
              key={retrospect.accessCode}
              answer={retrospect.answer}
              accessCode={retrospect.accessCode}
            />
          ))}
        </ListLayout>
      )}
    </>
  );
};

export default MyPageContent;
