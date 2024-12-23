import type { Meta, StoryObj } from '@storybook/react';

import ContentBox from '@/components/CoduoDocs/ContentBox/ContentBox';
import FloatingSidebar from '@/components/CoduoDocs/FloatingSidebar/FloatingSidebar';

import { PAIR_PROGRAMMING_CONCEPT } from '@/constants/coduoDocs';

const meta = {
  title: 'component/CoduoDocs/FloatingSidebar',
  component: FloatingSidebar,
} satisfies Meta<typeof FloatingSidebar>;

export default meta;

type Story = StoryObj<typeof FloatingSidebar>;

export const Default: Story = {
  render: () => (
    <FloatingSidebar>
      <ContentBox title="시작하기" contents={PAIR_PROGRAMMING_CONCEPT} activeSection="input-name" />
    </FloatingSidebar>
  ),
};
