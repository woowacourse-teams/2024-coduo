import CheckBox from '@/components/common/CheckBox/CheckBox';

import * as S from './TodoItem.styles';

interface TodoItemProps {
  content: string;
}

const TodoItem = ({ content }: TodoItemProps) => {
  return (
    <S.Layout>
      <CheckBox />
      <p>{content}</p>
    </S.Layout>
  );
};

export default TodoItem;
