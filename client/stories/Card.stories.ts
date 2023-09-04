import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
    title: 'Hash/Card',
    component: Card,
    parameters: {
      layout: 'centered',
    },
    tags: ['hash'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  } satisfies Meta<typeof Card>;

  export default meta;
type Story = StoryObj<typeof meta>;

export const light: Story = {
    args: {
        backgroundColor: 'whitesmoke',
    }
}

export const dark: Story = {
    args: {
        backgroundColor: 'black',
    }
}

export const lightSmall: Story = {
    args: {
        backgroundColor: 'whitesmoke',
        size: 'sm',
    }
}

export const lightLarge: Story = {
    args: {
        backgroundColor: 'whitesmoke',
        size: 'lg',
    }
}
