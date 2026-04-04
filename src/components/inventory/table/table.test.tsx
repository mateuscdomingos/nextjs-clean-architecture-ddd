import { render, screen } from '@/test/test-utils';
import { InventoryTable } from './table';
import { ProductProps } from '@/core/domain/Product/product.types';

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'store-1' }),
}));

jest.mock('@/app/actions/product-actions/update-stock', () => ({
  handleUpdateStockQuantity: jest.fn(),
}));

describe('InventoryTable', () => {
  const mockData: ProductProps[] = [
    {
      id: '1',
      name: 'Dark Roast Blend',
      roast: 'dark',
      priceInCents: 5000,
      stockQuantity: 10,
      minimumStockQuantity: 5,
      unit: 'kg',
      storeId: 'store-1',
    },
    {
      id: '2',
      name: 'Light Morning',
      roast: 'light',
      priceInCents: 4500,
      stockQuantity: 2,
      minimumStockQuantity: 5,
      unit: 'bags',
      storeId: 'store-1',
    },
  ];

  it('should render the table headers correctly', () => {
    render(<InventoryTable data={mockData} />);

    expect(
      screen.getByRole('columnheader', { name: 'Product' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Roast' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Stock' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Price' }),
    ).toBeInTheDocument();
  });

  it('should render the product data correctly', () => {
    render(<InventoryTable data={mockData} />);

    expect(screen.getByText('Dark Roast Blend')).toBeInTheDocument();
    expect(screen.getByText('Light Morning')).toBeInTheDocument();

    expect(screen.getByText('R$ 50,00')).toBeInTheDocument();
    expect(screen.getByText('R$ 45,00')).toBeInTheDocument();

    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('should apply destructive class when stock is below or equal minimum', () => {
    render(<InventoryTable data={mockData} />);

    const lowStockCell = screen.getByText('2 bags');
    expect(lowStockCell).toHaveClass('text-destructive font-bold');

    const normalStockCell = screen.getByText('10 kg');
    expect(normalStockCell).not.toHaveClass('text-destructive');
  });

  it('should render the empty state message when there is no data', () => {
    render(<InventoryTable data={[]} />);

    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });

  it('should render action buttons for each row', () => {
    render(<InventoryTable data={mockData} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4);
  });

  it('should disable decrement button if stock is zero', () => {
    const zeroStockData: ProductProps[] = [
      {
        ...mockData[0],
        stockQuantity: 0,
      },
    ];

    render(<InventoryTable data={zeroStockData} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
  });
});
