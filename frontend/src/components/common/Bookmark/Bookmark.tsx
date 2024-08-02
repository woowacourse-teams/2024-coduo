import * as S from './Bookmark.styles';
interface BookmarkProps {
  url: string;
  image?: string;
  title: string;
  description: string;
  deleteReferenceLink: () => void;
} //TODO: 삭제 버튼 시 이동 안되게 하기

const Bookmark = ({ url, image, title, description, deleteReferenceLink }: BookmarkProps) => {
  //TODO: 삭제 로직
  return (
    <>
      <S.Layout href={url}>
        <S.DeleteButton onClick={() => deleteReferenceLink()} />
        {image ? <S.Image alt="link" src={image} /> : <S.NoneImage>이미지가 없어욧</S.NoneImage>}
        <S.Box>
          <S.Title>{title}</S.Title>
          <S.Content>{description}</S.Content>
        </S.Box>
      </S.Layout>
    </>
  );
};

export default Bookmark;
