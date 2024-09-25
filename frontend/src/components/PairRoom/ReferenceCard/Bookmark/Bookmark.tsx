import { Link } from 'react-router-dom';

import * as S from './Bookmark.styles';

interface BookmarkProps {
  url: string;
  image?: string;
  title: string;
  description: string;
  onDeleteBookmark: () => void;
}

const Bookmark = ({ url, image, title, description, onDeleteBookmark }: BookmarkProps) => {
  return (
    <S.Layout>
      <S.DeleteButton onClick={onDeleteBookmark} />
      {image ? (
        <S.Image alt="link" src={image} />
      ) : (
        <S.NoneImage>
          이미지가
          <br />
          없습니다
        </S.NoneImage>
      )}
      <Link to={url} target="_blank">
        <S.Box>
          <S.Title>{title}</S.Title>
          <S.Content>{description}</S.Content>
        </S.Box>
      </Link>
    </S.Layout>
  );
};

export default Bookmark;
