import { TextareaHTMLAttributes } from 'react';

import * as S from './Textarea.styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  charNumber: string;
}
const TextArea = ({ id, charNumber, ...props }: TextareaProps) => {
  return (
    <S.Layout>
      <S.Textarea id={id} {...props} />
      <S.CharNumberText>{charNumber}</S.CharNumberText>
    </S.Layout>
  );
};

export default TextArea;
