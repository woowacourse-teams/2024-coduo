/* eslint-disable jsx-a11y/no-autofocus */
import { GithubLogoWhite } from '@/assets';

import Input from '@/components/common/Input/Input';
import { InputType } from '@/components/common/Input/Input.type';

import useGetBranches from '@/queries/PairRoomOnboarding/useGetBranches';

import * as S from './CreateBranchInput.styles';

interface CreateBranchInputProps {
  repositoryName: string;
  branchName: InputType;
  onBranchName: (event: React.ChangeEvent<HTMLInputElement>, branches: string[]) => void;
}

const CreateBranchInput = ({ repositoryName, branchName, onBranchName }: CreateBranchInputProps) => {
  const { branches } = useGetBranches(repositoryName);

  return (
    <S.Layout aria-label={`${repositoryName} 레포지토리가 선택되었습니다. 총 2개의 설정 항목 중 2번째 항목입니다.`}>
      <S.TitleContainer>
        <S.Title>{repositoryName}</S.Title>
        <S.SubTitle>미션을 시작할 브랜치 이름을 입력해 주세요.</S.SubTitle>
      </S.TitleContainer>
      <S.InputContainer>
        <S.RepositoryNameBox aria-hidden="true">
          <S.GithubLogo src={GithubLogoWhite} alt="" />
          {repositoryName}
        </S.RepositoryNameBox>
        <S.InputWrapper>
          <S.ArrowIcon aria-hidden="true" />
          <Input
            autoFocus
            placeholder="미션에서 사용할 브랜치 이름을 입력해 주세요."
            value={branchName.value}
            status={branchName.status}
            message={branchName.message}
            onChange={(event) => onBranchName(event, branches)}
          />
        </S.InputWrapper>
      </S.InputContainer>
    </S.Layout>
  );
};

export default CreateBranchInput;
