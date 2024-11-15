import { Meta, StoryFn } from '@storybook/react';
import { FaBeer } from 'react-icons/fa'; // Example icon from react-icons

import IconButton from './IconButton';

interface IconButtonProps {
  icon: React.ReactElement;
  size?: 'sm' | 'md' | 'lg' | 'xl' | string;
  backgroundColor?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default {
  title: 'component/common/IconButton',
  component: IconButton,
  argTypes: {
    size: { control: { type: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
    backgroundColor: { control: 'color' },
    isActive: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<IconButtonProps> = (args: IconButtonProps) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <FaBeer />,
};

export const LargeInactive = Template.bind({});
LargeInactive.args = {
  icon: <FaBeer />,
  size: 'lg',
  backgroundColor: 'gray',
  isActive: false,
  disabled: true,
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  icon: <FaBeer />,
  size: 'md',
  backgroundColor: '#a21321',
  isActive: true,
};
