import { Meta, StoryFn } from '@storybook/react';
import { FaBeer } from 'react-icons/fa';

import IconButton from './IconButton';

interface IconButtonProps {
  icon: React.ReactElement;
  size?: 'sm' | 'md' | 'lg' | 'xl' | string;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default {
  title: 'component/common/IconButton',
  component: IconButton,
  argTypes: {
    size: { control: { type: 'text', options: ['sm', 'md', 'lg', 'xl'] } },
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<IconButtonProps> = (args: IconButtonProps) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <FaBeer />,
};

export const LargeDisabled = Template.bind({});
LargeDisabled.args = {
  icon: <FaBeer />,
  size: 'lg',
  disabled: true,
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  icon: <FaBeer />,
  size: 'md',
  color: '#FFFFFF',
  backgroundColor: '#a21321',
};
