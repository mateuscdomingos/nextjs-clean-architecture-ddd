import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { InventoryTable } from './table';

const meta = {
  title: 'Components/Product/InventoryTable',
  component: InventoryTable,
} satisfies Meta<typeof InventoryTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        id: '1',
        name: 'Catuaí Vermelho',
        roast: 'medium',
        stockQuantity: 15,
        minimumStockQuantity: 5,
        priceInCents: 4500,
        unit: 'un.',
        storeId: 'store-id',
      },
      {
        id: '2',
        name: 'Bourbon Amarelo',
        roast: 'light',
        stockQuantity: 3,
        minimumStockQuantity: 5,
        priceInCents: 6200,
        unit: 'un.',
        storeId: 'store-id',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};
