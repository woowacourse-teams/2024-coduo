import * as S from './Bookmark.styles';
interface BookmarkProps {
  link: string;
  image?: string;
  // key: string;
}
const BOOKMARK_TITLE = 'titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle';
const BOOKMARK_CONTENTS =
  'contentcontentcontentcontecontentcontentcontentcontentcocontentcontentcontentconcontentcontentcontentcontentcontentcontentcontentconntentconntcontentcontentcontentcontent';

const Bookmark = ({ link, image }: BookmarkProps) => {
  return (
    <S.Layout href={link}>
      {image ? <S.Image alt="link" src={image} /> : <S.NoneImage>이미지가 없어욧</S.NoneImage>}

      <S.Box>
        <S.Title>{BOOKMARK_TITLE}</S.Title>
        <S.Content>{BOOKMARK_CONTENTS}</S.Content>
      </S.Box>
    </S.Layout>
  );
};

export default Bookmark;
