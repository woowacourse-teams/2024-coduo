import type { Meta, StoryObj } from '@storybook/react';

import TitleContainer from './TitleContainer';

const meta = {
  title: 'component/common/TitleContainer',
  component: TitleContainer,
} satisfies Meta<typeof TitleContainer>;

export default meta;

type Story = StoryObj<typeof TitleContainer>;

export const Default: Story = {
  args: {
    title: '제목 표시',
    subTitle: '부제목 표시',
  },
};
