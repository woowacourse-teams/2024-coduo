import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/common/Button/Button';
import Body from '@/components/common/Modal/Body/Body';
import CloseButton from '@/components/common/Modal/CloseButton/CloseButton';
import Footer from '@/components/common/Modal/Footer/Footer';
import Header from '@/components/common/Modal/Header/Header';

import Modal from './Modal';

const meta = {
  title: 'component/common/Modal',
  component: Modal,
  parameters: {
    controls: { exclude: ['close', 'children'] },
  },
  argTypes: {
    position: {
      options: ['CENTER', 'BOTTOM'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    height: {
      control: { type: 'text' },
    },
    backdropType: {
      options: ['TRANSPARENT', 'BLUR', 'OPAQUE'],
      control: { type: 'radio' },
    },
    shadow: {
      control: { type: 'boolean' },
    },
    animation: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

const CHILDREN_EXAMPLE = (
  <>
    <CloseButton close={() => {}} />
    <Header title="모달 제목" subTitle="모달 부제목" />
    <Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.
      Pellentesque sit amet hendrerit risus, sed porttitor quam. Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
      quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit
      venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed
      porttitor quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit
      venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.Lorem ipsum dolor sit amet, consectetur
      adipiscing elit.
    </Body>
    <Footer>
      <Button filled={false}>취소</Button>
      <Button>확인</Button>
    </Footer>
  </>
);

export const Center: Story = {
  args: {
    isOpen: true,
    children: CHILDREN_EXAMPLE,
  },
};

export const Bottom: Story = {
  args: {
    isOpen: true,
    children: CHILDREN_EXAMPLE,
    position: 'BOTTOM',
  },
};
