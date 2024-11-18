import { Meta, StoryFn } from '@storybook/react';

import TextButton from '@/components/_common/TextButton/TextButton';
import { TextButtonProps } from '@/components/_common/TextButton/TextButton.type';

export default {
  title: 'component/common/TextButton',
  component: TextButton,
  argTypes: {
    size: { control: { type: 'text', options: ['sm', 'md', 'lg', 'xl'] } },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<TextButtonProps> = (args: TextButtonProps) => <TextButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: '기본 텍스트 버튼',
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Github로 로그인',
  size: 'lg',
  disabled: true,
};

export const CustomButton = Template.bind({});
CustomButton.args = {
  text: '커스텀 컬러',
  size: 'md',
  color: '#a21321',
  underline: true,
  opacity: true,
};
