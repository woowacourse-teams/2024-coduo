import * as S from './Bookmark.styles';
interface BookmarkProps {
  link: string;
  // key: string;
}

const Bookmark = ({ link }: BookmarkProps) => {
  return (
    <S.Layout href={link}>
      <S.Image
        alt="link"
        src="https://fastly.picsum.photos/id/873/200/300.jpg?hmac=CQHrOY67pytIwHLic3cAxphNbh2NwdxnFQtwaX5MLkM"
      />
      {/* <S.NoneImage>이미지가 없어욧</S.NoneImage> */}
      <S.Box>
        <S.Title>titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle</S.Title>
        <S.Content>
          contentcontentcontentcontecontentcontentcontentcontentcocontentcontentcontentconcontentcontentcontentcontentcontentcontentcontentconntentconntcontentcontentcontentcontent
        </S.Content>
      </S.Box>
    </S.Layout>
  );
};

export default Bookmark;
