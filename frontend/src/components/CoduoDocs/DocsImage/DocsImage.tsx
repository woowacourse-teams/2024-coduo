import * as S from './DocsImage.styles';

interface DocsImageProps {
  information?: string;
  src: string;
  webpSrc: string;
  alt: string;
  id?: string;
}

const DocsImage = ({ information, src, alt, webpSrc, id, children }: React.PropsWithChildren<DocsImageProps>) => {
  return (
    <S.Container>
      {information && <S.Contents id={id}>{information}</S.Contents>}
      {children}
      <picture>
        <source srcSet={`${webpSrc}`} type="image/webp" />
        <img src={src} alt={alt} />
      </picture>
    </S.Container>
  );
};

export default DocsImage;
