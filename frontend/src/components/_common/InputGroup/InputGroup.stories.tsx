import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/_common/Button/Button';
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
      <InputGroup.Input placeholder="이메일을 입력해주세요" status="ERROR" />
      <InputGroup.Message status="ERROR">이메일 형식이 올바르지 않습니다.</InputGroup.Message>
    </InputGroup>
  ),
};

export const WithContent: Story = {
  render: () => (
    <InputGroup>
      <InputGroup.Label>이메일</InputGroup.Label>
      <InputGroup.Content>
        <InputGroup.Input placeholder="이메일을 입력해주세요" />
        <Button>인증하기</Button>
      </InputGroup.Content>
      <InputGroup.Message>인증번호가 발송되었습니다.</InputGroup.Message>
    </InputGroup>
  ),
};
