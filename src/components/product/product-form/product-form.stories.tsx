import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProductForm } from './product-form';

const meta = {
  title: 'Components/Product/ProductForm',
  component: ProductForm,
} satisfies Meta<typeof ProductForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
