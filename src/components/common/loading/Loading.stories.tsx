import type { Meta, StoryObj } from '@storybook/react-vite'

import { Loading } from '@/components'

const meta: Meta<typeof Loading> = {
  title: 'Common/Loading',
  component: Loading,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Loading>

const DefaultLoading = () => {
  return <Loading />
}

export const Default: Story = {
  render: () => <DefaultLoading />,
}
