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
  color?: ButtonColor | string;
  filled?: boolean;
  rounded?: boolean;
  animation?: boolean;
  disabled?: boolean;
}

export default {
  title: 'component/common/Button',
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

export const Primary_filled = Template.bind({});
Primary_filled.args = {
  size: 'md',
  color: 'primary',
  filled: true,
  rounded: false,
  animation: false,
  disabled: false,
};

export const Primary_outlined = Template.bind({});
Primary_outlined.args = {
  size: 'md',
  color: 'primary',
  filled: false,
  rounded: false,
  animation: false,
  disabled: false,
};

export const Primary_rounded = Template.bind({});
Primary_rounded.args = {
  size: 'md',
  color: 'primary',
  filled: true,
  rounded: true,
  animation: false,
  disabled: false,
};

export const Secondary_filled = Template.bind({});
Secondary_filled.args = {
  size: 'md',
  color: 'secondary',
  filled: true,
  rounded: false,
  animation: false,
  disabled: false,
};

export const Secondary_outlined = Template.bind({});
Secondary_outlined.args = {
  size: 'md',
  color: 'secondary',
  filled: false,
  rounded: false,
  animation: false,
  disabled: false,
};

export const Secondary_rounded = Template.bind({});
Secondary_rounded.args = {
  size: 'md',
  color: 'secondary',
  filled: true,
  rounded: true,
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

export const CustomColor_dark = Template.bind({});
CustomColor_dark.args = {
  size: 'md',
  color: '#7632ba',
  filled: true,
};

export const CustomColor_light = Template.bind({});
CustomColor_light.args = {
  size: 'md',
  color: '#b4d19b',
  filled: true,
};

export const Black = Template.bind({});
Black.args = {
  size: 'md',
  color: 'black',
  filled: true,
};
