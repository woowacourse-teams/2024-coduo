import * as S from './DocsImage.styles';

interface DocsImageProps {
  information?: string;
  src: string;
  alt: string;
  id?: string;
}

const DocsImage = ({ information, src, alt, id, children }: React.PropsWithChildren<DocsImageProps>) => {
  return (
    <S.Container>
      {information && <S.Contents id={id}>{information}</S.Contents>}
      {children}
      <img src={src} alt={alt} loading="lazy" />
    </S.Container>
  );
};

export default DocsImage;
