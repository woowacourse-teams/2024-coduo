import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/common/Button/Button';

import Footer from './Footer';

const meta = {
  title: 'component/common/modal/Footer',
  component: Footer,
  parameters: {
    controls: { exclude: 'children' },
  },
  argTypes: {
    direction: {
      options: ['row', 'column'],
      control: { type: 'radio' },
    },
    position: {
      options: ['left', 'center', 'right'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof Footer>;

const CHILDREN_EXAMPLE = (
  <>
    <Button filled={false}>취소</Button>
    <Button>확인</Button>
  </>
);

export const Default: Story = {
  args: {
    children: CHILDREN_EXAMPLE,
  },
};
