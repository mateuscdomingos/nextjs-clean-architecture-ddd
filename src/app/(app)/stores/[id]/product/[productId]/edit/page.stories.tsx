import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import EditProductPage from './page';
import { GetProductByIdUseCaseFactory } from '@/infra/factories/GetProductByIdUseCaseFactory';
import { Product } from '@/core/domain/Product/Product.class';

type GetProductByIdFn = typeof GetProductByIdUseCaseFactory.makeGetProductById;

const meta = {
  title: 'Pages/EditProductPage',
  component: EditProductPage,
  beforeEach: () => {
    (GetProductByIdUseCaseFactory.makeGetProductById as GetProductByIdFn) =
      () => async () =>
        new Product({
          id: '123',
          name: 'Storybook Coffee',
          roast: 'light',
          priceInCents: 3500,
          stockQuantity: 50,
          minimumStockQuantity: 10,
          unit: 'kg',
          storeId: 'store-1',
        });
  },
} satisfies Meta<typeof EditProductPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    params: Promise.resolve({
      id: 'store-1',
      productId: 'prod-123',
    }),
  },
};

export const NotFound: Story = {
  args: {
    params: Promise.resolve({
      id: 'store-1',
      productId: 'non-existent',
    }),
  },
  beforeEach: () => {
    (GetProductByIdUseCaseFactory.makeGetProductById as GetProductByIdFn) =
      () => async () =>
        null;
  },
};
