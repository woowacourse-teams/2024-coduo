import Quote from '@/components/CoduoDocs/Quote/Quote';
import SourceCode from '@/components/CoduoDocs/SourceCode/SourceCode';

import * as S from './Steps.styles';

interface Data {
  title?: string;
  src?: string;
  id?: string;
  info?: string;
  sourceCode?: string[];
}

interface DocsImageProps {
  steps?: Data[];
}

const Steps = ({ steps }: DocsImageProps) => {
  return (
    <>
      {steps?.map((data, index) => {
        return (
          <S.Container key={index} id={data.id}>
            {data.title && <S.Contents>{data.title}</S.Contents>}
            {data.info && <Quote text={data.info} />}
            {data.src && <S.Image src={data.src} alt={data.id} />}
            {data.sourceCode?.map((sourceCode, index) => <SourceCode key={index} code={sourceCode}></SourceCode>)}
          </S.Container>
        );
      })}
    </>
  );
};

export default Steps;
