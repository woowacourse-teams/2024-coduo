import Header from '@/components/Retrospect/RetrospectHeader/Header/Header';

interface RetrospectHeaderProps {
  readOnly: boolean;
  accessCode: string;
  onClick?: () => void;
}

const RetrospectHeader = ({ readOnly, onClick }: RetrospectHeaderProps) => {
  const getHeaderProps = (isReadOnly: boolean) => {
    if (isReadOnly)
      return {
        title: '"방제목" 에서의 회고입니다!',
        buttonText: '페어룸으로 이동',
        onButtonClick: () => {
          onClick && onClick();
        },
      };
    else
      return {
        title: '회고 작성하기',
        buttonText: '나중에 작성하기',
        onButtonClick: () => {
          onClick && onClick();
        },
      };
  };

  return <Header {...getHeaderProps(readOnly)} />;
};

export default RetrospectHeader;
