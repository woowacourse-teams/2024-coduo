import { GithubLogoWhite } from '@/assets';

import Input from '@/components/common/Input/Input';
import { InputType } from '@/components/common/Input/Input.type';
import { HiddenMessage } from '@/components/common/WebAccessibility/WebAccessibility.styles';

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
    <S.Layout>
      <HiddenMessage aria-live="polite">{branchName.value && `${branchName.value}`}</HiddenMessage>
      <HiddenMessage aria-live="polite">{branchName.message && `${branchName.message}`}</HiddenMessage>
      <S.TitleContainer aria-hidden="true">
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
