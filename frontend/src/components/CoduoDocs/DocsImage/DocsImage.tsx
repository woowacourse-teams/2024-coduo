import * as S from './DocsImage.styles';

interface DocsImageProps {
  information?: string;
  src: string;
  webpSrc: string;
  alt: string;
}

const DocsImage = ({ information, src, alt, webpSrc, children }: React.PropsWithChildren<DocsImageProps>) => {
  return (
    <S.Container>
      {information && <S.Contents>{information}</S.Contents>}
      {children}
      <picture>
        <source srcSet={`${webpSrc}`} type="image/webp" />
        <img src={src} alt={alt} />
      </picture>
    </S.Container>
  );
};

export default DocsImage;
