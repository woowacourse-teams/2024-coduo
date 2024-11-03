import type { Meta, StoryObj } from '@storybook/react';

import { InputGroup } from '@/components/_common/InputGroup';

const meta = {
  title: 'component/common/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroup.Label>이메일</InputGroup.Label>
      <InputGroup.Input placeholder="이메일을 입력해주세요" />
    </InputGroup>
  ),
};

export const WithMessage: Story = {
  render: () => (
    <InputGroup>
      <InputGroup.Label>이메일</InputGroup.Label>
      <InputGroup.Input placeholder="이메일을 입력해주세요" />
      <InputGroup.Message>이메일 형식이 올바르지 않습니다.</InputGroup.Message>
    </InputGroup>
  ),
};

export const WithContent: Story = {
  render: () => (
    <InputGroup>
      <InputGroup.Label>이메일</InputGroup.Label>
      <InputGroup.Content>
        <InputGroup.Input placeholder="이메일을 입력해주세요" />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">인증하기</button>
      </InputGroup.Content>
      <InputGroup.Message>인증번호가 발송되었습니다.</InputGroup.Message>
    </InputGroup>
  ),
};

// 모든 기능을 조합한 예시
export const FullExample: Story = {
  render: () => (
    <div className="space-y-4">
      <InputGroup>
        <InputGroup.Label>기본 입력</InputGroup.Label>
        <InputGroup.Input placeholder="텍스트를 입력해주세요" />
      </InputGroup>

      <InputGroup>
        <InputGroup.Label>에러 메시지</InputGroup.Label>
        <InputGroup.Input placeholder="이메일을 입력해주세요" className="border-red-500" />
        <InputGroup.Message>필수 입력 항목입니다.</InputGroup.Message>
      </InputGroup>

      <InputGroup>
        <InputGroup.Label>부가 컨텐츠</InputGroup.Label>
        <InputGroup.Content>
          <InputGroup.Input placeholder="인증번호를 입력해주세요" />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">확인</button>
        </InputGroup.Content>
        <InputGroup.Message>인증이 완료되었습니다.</InputGroup.Message>
      </InputGroup>
    </div>
  ),
};
