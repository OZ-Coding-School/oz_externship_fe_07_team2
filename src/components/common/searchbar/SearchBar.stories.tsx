import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import SearchBar from './SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Common/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SearchBar>

const DefaultSearchBar = () => {
  const [value, setValue] = useState('')

  return <SearchBar value={value} onChange={setValue} />
}

const WithTextSearchBar = () => {
  const [value, setValue] = useState('text text text')

  return <SearchBar value={value} onChange={setValue} />
}

export const Default: Story = {
  render: () => <DefaultSearchBar />,
}

export const WithText: Story = {
  render: () => <WithTextSearchBar />,
}
