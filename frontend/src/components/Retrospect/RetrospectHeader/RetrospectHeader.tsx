import { useNavigate } from 'react-router-dom';

import Header from '@/components/Retrospect/RetrospectHeader/Header/Header';

interface RetrospectHeaderProps {
  readOnly: boolean;
  accessCode: string;
}

const RetrospectHeader = ({ readOnly, accessCode }: RetrospectHeaderProps) => {
  const navigate = useNavigate();
  const getHeaderProps = (isReadOnly: boolean) => {
    if (isReadOnly)
      return {
        title: '"방제목" 에서의 회고입니다!',
        buttonText: '페어룸으로 이동',
        onButtonClick: () => {
          navigate(`/room/${accessCode}`);
        },
      };
    else
      return {
        title: '회고 작성하기',
        buttonText: '나중에 작성하기',
        onButtonClick: () => {
          alert('나중에 작성하시겠습니까?');
          navigate(`/room/${accessCode}`);
        },
      };
  };

  return <Header {...getHeaderProps(readOnly)} />;
};

export default RetrospectHeader;
