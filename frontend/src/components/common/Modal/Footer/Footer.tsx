import * as S from './Footer.styles';

export type Direction = 'row' | 'column';
export type Position = 'left' | 'center' | 'right';

interface FooterProps {
  direction?: Direction;
  position?: Position;
}

const Footer = ({ direction = 'row', position = 'right', children }: React.PropsWithChildren<FooterProps>) => {
  return (
    <S.Layout $direction={direction} $position={position}>
      {children}
    </S.Layout>
  );
};

export default Footer;
