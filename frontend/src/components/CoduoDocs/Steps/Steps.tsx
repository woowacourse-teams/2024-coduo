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
            {data.title && <S.Title>{data.title}</S.Title>}
            {data.info && <S.Content>{data.info}</S.Content>}
            {data.src && <S.Image src={data.src} alt={data.id} />}
            {data.sourceCode?.map((sourceCode, index) => <SourceCode key={index} code={sourceCode}></SourceCode>)}
          </S.Container>
        );
      })}
    </>
  );
};

export default Steps;
