import { ButtonHTMLAttributes } from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { css } from 'styled-components';

import { ButtonColor, ButtonSize } from '@/components/_common/Button/Button.type';

import Button from './Button';

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  $css?: ReturnType<typeof css>;
  size?: ButtonSize;
  width?: string;
  height?: string;
  borderRadius?: string;
  fontSize?: string;
  color?: ButtonColor;
  filled?: boolean;
  rounded?: boolean;
  animation?: boolean;
  disabled?: boolean;
}

export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    size: { control: { type: 'select', options: ['sm', 'md', 'lg'] } },
    color: { control: { type: 'select', options: ['primary', 'secondary', 'danger'] } },
    filled: { control: 'boolean' },
    rounded: { control: 'boolean' },
    animation: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<ButtonProp> = (args: ButtonProp) => <Button {...args}>Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  color: 'primary',
  filled: true,
  rounded: false,
  animation: false,
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: 'md',
  color: 'secondary',
  filled: true,
  rounded: false,
  animation: false,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: 'md',
  color: 'primary',
  filled: true,
  rounded: false,
  animation: false,
  disabled: true,
};
