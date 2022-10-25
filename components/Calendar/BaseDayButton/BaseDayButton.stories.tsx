import React, { useState, useEffect } from 'react'
import { Story, Meta } from '@storybook/react'
import BaseDayButton, { BaseDayButtonProps } from './BaseDayButton'

export default {
  title: 'components/Calendar/BaseDayButton',
  component: BaseDayButton,
  argTypes: {},
} as Meta

const Template: Story<BaseDayButtonProps> = (args) => {
  const [active, setActive] = useState<boolean>(args.active ?? false)

  const handleClick = () => {
    setActive((prev) => !prev)
  }

  useEffect(() => {
    if (args.active !== undefined) {
      setActive(args.active)
    }
  }, [args.active])

  return <BaseDayButton {...args} active={active} onClick={handleClick} />
}

export const Normal = Template.bind({})

Normal.args = {
  children: '1日',
}

export const TodayMonth = Template.bind({})

TodayMonth.args = {
  ...Normal.args,
  isToday: true,
}

export const NonCurrentMonth = Template.bind({})

NonCurrentMonth.args = {
  ...Normal.args,
  nonCurrentMonth: true,
}
