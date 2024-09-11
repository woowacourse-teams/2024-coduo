import { useLocation } from 'react-router-dom';

import { Content } from '@/components/CoduoDocs/Docs/Docs.type';

import * as S from './FloatingSidebar.styles';

interface ContentBoxProps {
  title: string;
  contents: Content[];
}

const ContentBox = ({ title, contents }: ContentBoxProps) => {
  const location = useLocation();

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.ContentList>
        {contents.map((content) => {
          return (
            <S.ContentItem key={content.id} to={`#${content.id}`} $isActive={location.hash === `#${content.id}`}>
              {content.subtitle}
            </S.ContentItem>
          );
        })}
      </S.ContentList>
    </S.Container>
  );
};

export default ContentBox;
