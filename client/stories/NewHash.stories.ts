import type { Meta, StoryObj } from "@storybook/react";
import { NewHash } from "./NewHash";

const meta = {
  title: "Hash/NewHash",
  component: NewHash,
  parameters: {
    layout: "centered",
  },
  tags: ["hash"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    width: { control: "text" },
  },
} satisfies Meta<typeof NewHash>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Focused: Story = {
    args: {
    }
}
