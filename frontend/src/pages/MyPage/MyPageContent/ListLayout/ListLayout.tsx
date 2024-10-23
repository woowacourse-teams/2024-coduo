import Spinner from '@/components/common/Spinner/Spinner';

import * as S from './ListLayout.styles';
interface ListLayoutProps extends React.PropsWithChildren {
  isFetching: boolean;
  emptyMessage: string;
  length: number;
}

const ListLayout = ({ isFetching, length, emptyMessage, children }: ListLayoutProps) => {
  return (
    <>
      {isFetching && <Spinner />}
      {!isFetching && length < 1 ? <S.EmptyText>{emptyMessage}</S.EmptyText> : <>{children}</>}
    </>
  );
};

export default ListLayout;
