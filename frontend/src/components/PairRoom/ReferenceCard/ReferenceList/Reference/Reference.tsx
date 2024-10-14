import { Link } from 'react-router-dom';

import * as S from './Reference.styles';

interface ReferenceProps {
  url: string;
  image?: string;
  title: string;
  description: string;
  onDeleteReference: () => void;
}

const Reference = ({ url, image, title, description, onDeleteReference }: ReferenceProps) => {
  return (
    <S.Layout>
      <S.DeleteButton onClick={onDeleteReference} />
      <Link to={url} target="_blank">
        {image ? (
          <S.Image alt="link" src={image} />
        ) : (
          <S.NoneImage>
            이미지가
            <br />
            없습니다
          </S.NoneImage>
        )}
        <S.Box>
          <S.Title>{title}</S.Title>
          <S.Content>{description}</S.Content>
        </S.Box>
      </Link>
    </S.Layout>
  );
};

export default Reference;
