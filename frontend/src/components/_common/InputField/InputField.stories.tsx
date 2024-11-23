import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/_common/Button/Button';
import { InputField } from '@/components/_common/InputField';

const meta = {
  title: 'component/common/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: () => (
    <InputField>
      <InputField.Label>이메일</InputField.Label>
      <InputField.Input placeholder="이메일을 입력해 주세요." status="ERROR" />
      <InputField.Message status="ERROR">이메일 형식이 올바르지 않습니다.</InputField.Message>
    </InputField>
  ),
};

export const WithContent: Story = {
  render: () => (
    <InputField>
      <InputField.Label>이메일</InputField.Label>
      <InputField.Content>
        <InputField.Input placeholder="이메일을 입력해 주세요." />
        <Button>인증하기</Button>
      </InputField.Content>
      <InputField.Message>인증 번호가 발송되었습니다.</InputField.Message>
    </InputField>
  ),
};
