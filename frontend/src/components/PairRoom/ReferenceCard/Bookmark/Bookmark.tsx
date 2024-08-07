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
    <S.Layout href={url}>
      <S.DeleteButton onClick={onDeleteBookmark} />
      {image ? <S.Image alt="link" src={image} /> : <S.NoneImage>이미지가 없어욧</S.NoneImage>}
      <S.Box>
        <S.Title>{title}</S.Title>
        <S.Content>{description}</S.Content>
      </S.Box>
    </S.Layout>
  );
};

export default Bookmark;
