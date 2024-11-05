import { useState } from 'react';

import { CurrentTabType } from '@/pages/MyPage/MyPage.type';

import ListLayout from '@/components/MyPage/ListLayout/ListLayout';
import MyPageTab from '@/components/MyPage/MyPageTab/MyPageTab';
import PairRoomButton from '@/components/MyPage/PairRoomButton/PairRoomButton';
import RetrospectButton from '@/components/MyPage/PairRoomButton/RetrospectButton';

import useGetMyPairRooms from '@/queries/MyPage/useGetMyPairRooms';
import useGetMyRetrospects from '@/queries/MyPage/useGetMyRetrospects';

import { TAB_CONFIG } from '@/constants/mypage';

const MyPageContent = () => {
  const [currentTab, setCurrentTab] = useState<CurrentTabType>('pairRoom');

  const handleTabClick = (tabKey: CurrentTabType) => {
    setCurrentTab(tabKey);
  };

  const { myPairRooms, isMyPairRoomsFetching } = useGetMyPairRooms();
  const { myRetrospects, isMyRetrospectsFetching } = useGetMyRetrospects();

  const myPairRoomLength = myPairRooms?.length || 0;
  const myRetrospectsLength = myRetrospects?.length || 0;

  return (
    <>
      <MyPageTab
        length={[myPairRoomLength, myRetrospectsLength]}
        currentTab={currentTab}
        handleTabClick={handleTabClick}
      />

      {currentTab === TAB_CONFIG[0].key && (
        <ListLayout
          length={myPairRoomLength}
          emptyMessage="생성한 페어룸이 없습니다."
          isFetching={isMyPairRoomsFetching}
        >
          {myPairRooms?.map((pairRoom) => (
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
          isFetching={isMyRetrospectsFetching}
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
