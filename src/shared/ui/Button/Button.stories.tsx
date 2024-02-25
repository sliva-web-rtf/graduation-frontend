import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BaseButton } from './Button';

export default {
  title: 'shared/BaseButton',
  component: BaseButton,
  argTypes: {
    size: {
      type: 'string',
      description: 'Размер',
      defaultValue: 'medium',
      options: ['small', 'medium', 'large'],
      control: {
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof BaseButton>;

const Template: ComponentStory<typeof BaseButton> = (args) => <BaseButton {...args} />;

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  children: 'Text',
};

export const Contained = Template.bind({});
Contained.args = {
  variant: 'contained',
  children: 'Text',
};

export const Shadowed = Template.bind({});
Shadowed.args = {
  variant: 'shadowed',
  children: 'Text',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  children: 'Text',
};
