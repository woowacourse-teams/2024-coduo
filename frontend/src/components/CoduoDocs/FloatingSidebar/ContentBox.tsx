// import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { Content } from '@/components/CoduoDocs/Docs/Docs.type';

import * as S from './FloatingSidebar.styles';

interface ContentBoxProps {
  title: string;
  contents: Content[];
  activeSection: string;
}

const ContentBox = ({ title, contents, activeSection }: ContentBoxProps) => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.ContentList>
        {contents.map((content) => {
          return (
            <S.ContentItem
              onClick={() => navigate(`#${content.id}`)}
              key={content.id}
              to={`#${content.id}`}
              $isActive={content.id === activeSection}
            >
              {content.subtitle}
            </S.ContentItem>
          );
        })}
      </S.ContentList>
    </S.Container>
  );
};

export default ContentBox;
