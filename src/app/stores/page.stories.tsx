import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StoresPage from './page';
import { StoreUseCaseFactory } from '@/infra/factories/StoreUseCaseFactory';

const mockStores = [
  {
    props: {
      id: 'store-1',
      name: 'Coffee Central',
      monthlyBudgetInCents: 500000,
      userId: 'user-1',
    },
  },
];

const meta = {
  title: 'Pages/StoresPage',
  component: StoresPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  loaders: [
    async () => {
      StoreUseCaseFactory.makeGetStoresByUser = () => {
        return async () => mockStores as never;
      };
      return {};
    },
  ],
} satisfies Meta<typeof StoresPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
