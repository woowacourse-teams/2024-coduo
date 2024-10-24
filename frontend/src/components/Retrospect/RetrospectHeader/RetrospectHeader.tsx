import Header from '@/components/Retrospect/RetrospectHeader/Header/Header';

interface RetrospectHeaderProps {
  readOnly: boolean;
  accessCode: string;
  onClick?: () => void;
}

const RetrospectHeader = ({ readOnly, accessCode, onClick }: RetrospectHeaderProps) => {
  const getHeaderProps = (readOnly: boolean) => {
    if (readOnly)
      return {
        title: `${accessCode} 에서의 회고입니다!`,
        buttonText: '페어룸으로 이동',
        onButtonClick: () => {
          onClick && onClick();
        },
      };
    else
      return {
        title: '페어프로그래밍에 대한 회고를 작성해 보세요!',
        buttonText: '나중에 작성하기',
        onButtonClick: () => {
          onClick && onClick();
        },
      };
  };

  return <Header {...getHeaderProps(readOnly)} />;
};

export default RetrospectHeader;
