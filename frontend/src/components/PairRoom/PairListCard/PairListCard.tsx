import { useState } from 'react';

import { IoIosArrowBack } from 'react-icons/io';
import { IoPeople } from 'react-icons/io5';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import { theme } from '@/styles/theme';

import * as S from './PairListCard.styles';

const PairListCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Layout>
      <PairRoomCard>
        <PairRoomCard.Header icon={<IoPeople color={theme.color.primary[500]} />} title="페어" />
        <S.Sidebar isOpen={isOpen}>
          <S.SidebarHeader>
            <IoIosArrowBack onClick={toggleSidebar} />
            <span>방 코드</span>
            <S.RoomCode>IUUIASDFJK</S.RoomCode>
            <S.CopyButton>복사</S.CopyButton>
          </S.SidebarHeader>
          <S.PairList>
            <S.PairItem>
              <S.PairRole>드라이버</S.PairRole>
              <S.PairName>퍼링</S.PairName>
            </S.PairItem>
            <S.PairItem>
              <S.PairRole>네비게이터</S.PairRole>
              <S.PairName>포롱</S.PairName>
            </S.PairItem>
          </S.PairList>
          <S.DeleteButton>방 삭제하기</S.DeleteButton>
        </S.Sidebar>
      </PairRoomCard>
    </S.Layout>
  );
};

export default PairListCard;
