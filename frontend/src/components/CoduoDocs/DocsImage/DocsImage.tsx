import * as S from './DocsImage.styles';

interface DocsImageProps {
  information: string;
  src: string;
}

const DocsImage = ({ information, src }: DocsImageProps) => {
  return (
    <S.Container>
      <S.Contents>{information}</S.Contents>
      {/* <picture> */}
      {/* <source
          srcSet={`${heroImageWpSmall} 500w, ${heroImageWpMedium} 1000w,${heroImageWpLarge} 2000vw`}
          type="image/webp"
        /> */}
      <S.Image src={src} alt="이미지" />
      {/* </picture> */}
    </S.Container>
  );
};

export default DocsImage;
