import * as S from './Footer.styles';

export type Direction = 'ROW' | 'COLUMN';
export type Position = 'LEFT' | 'CENTER' | 'RIGHT';

interface FooterProps {
  direction?: Direction;
  position?: Position;
}

const Footer = ({ direction = 'ROW', position = 'RIGHT', children }: React.PropsWithChildren<FooterProps>) => {
  return (
    <S.Layout $direction={direction} $position={position}>
      {children}
    </S.Layout>
  );
};

export default Footer;
