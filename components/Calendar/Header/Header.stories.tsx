import React from 'react'
import { Story, Meta } from '@storybook/react'
import Header, { HeaderProps } from './Header'

export default {
  title: 'components/Calendar/Header',
  component: Header,
  argTypes: {},
} as Meta

const Template: Story<HeaderProps> = (args) => {
  return <Header {...args} />
}

export const Normal = Template.bind({})

Normal.args = {
  children: '2022年7月',
}
