import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-components';

import Button from '@/components/common/Button/Button';

const meta = {
  title: 'component/common/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

const CustomButton = css`
  background-color: red;
  &:hover {
    background-color: #d80000;
  }
  &:active {
    background-color: #9e0000;
  }
`;

export const Default: Story = {
  args: {
    click: () => console.log(),
    children: '확인',
  },
};

export const UsedCss: Story = {
  args: {
    click: () => console.log(),
    children: '확인',
    css: CustomButton,
  },
};
