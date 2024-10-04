import type { Meta, StoryObj } from '@storybook/react';

import DocsImage from '@/components/CoduoDocs/DocsImage/DocsImage';

const meta = {
  title: 'component/CoduoDocs/DocsImage',
  component: DocsImage,
} satisfies Meta<typeof DocsImage>;

export default meta;

type Story = StoryObj<typeof DocsImage>;

export const Default: Story = {
  args: {
    information: '1. 방 만들기 버튼을 누르면 페어 프로그래밍을 진행할 방이 생성됩니다.',
    src: 'https://i.pravatar.cc',
  },
};
