import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BaseField } from './Field';

export default {
  title: 'shared/BaseField',
  component: BaseField,
} as ComponentMeta<typeof BaseField>;

const Template: ComponentStory<typeof BaseField> = (args) => <BaseField {...args} />;

export const Normal = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: true,
};

export const Focus = Template.bind({});
Focus.args = {
  focused: true,
};
