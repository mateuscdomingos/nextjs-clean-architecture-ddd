import { render, screen } from '@/test/test-utils';
import EditProductPage from './page';
import { GetProductByIdUseCaseFactory } from '@/infra/factories/GetProductByIdUseCaseFactory';
import { notFound } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'store-123', productId: 'prod-456' }),
  useRouter: () => ({ push: jest.fn() }),
  notFound: jest.fn(),
}));

jest.mock('@/app/actions/product-actions', () => ({
  handleCreateProduct: jest.fn(),
  handleUpdateProduct: jest.fn(),
}));

jest.mock('@/infra/factories/GetProductByIdUseCaseFactory', () => ({
  GetProductByIdUseCaseFactory: {
    makeGetProductById: jest.fn(),
  },
}));

describe('EditProductPage', () => {
  const mockStoreId = 'store-123';
  const mockProductId = 'prod-456';
  const props = {
    params: Promise.resolve({ id: mockStoreId, productId: mockProductId }),
  };

  const mockProduct = {
    props: {
      id: mockProductId,
      name: 'Editable Specialty Coffee',
      roast: 'medium',
      priceInCents: 5000,
      stockQuantity: 10,
      minimumStockQuantity: 2,
      unit: 'un',
      storeId: mockStoreId,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the edit page with product data', async () => {
    (
      GetProductByIdUseCaseFactory.makeGetProductById as jest.Mock
    ).mockReturnValue(jest.fn().mockResolvedValue(mockProduct));

    const ResolvedPage = await EditProductPage(props);
    render(ResolvedPage);

    expect(
      screen.getByRole('heading', { name: 'Edit Product' }),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('Editable Specialty Coffee'),
    ).toBeInTheDocument();
  });

  it('should call notFound if product does not exist', async () => {
    (
      GetProductByIdUseCaseFactory.makeGetProductById as jest.Mock
    ).mockReturnValue(jest.fn().mockResolvedValue(null));

    await EditProductPage(props);

    expect(notFound).toHaveBeenCalled();
  });

  it('should render breadcrumb with correct links', async () => {
    (
      GetProductByIdUseCaseFactory.makeGetProductById as jest.Mock
    ).mockReturnValue(jest.fn().mockResolvedValue(mockProduct));

    const ResolvedPage = await EditProductPage(props);
    render(ResolvedPage);

    const inventoryLink = screen.getByRole('link', { name: /inventory/i });
    expect(inventoryLink).toHaveAttribute(
      'href',
      `/stores/${mockStoreId}/inventory`,
    );
  });
});
