import { render, screen } from '@/test/test-utils';
import NewProductPage from './page';

jest.mock('next/navigation', () => ({
  useParams: () => ({
    id: 'store-id',
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/app/actions/product-actions', () => ({
  handleCreateProduct: jest.fn(),
}));

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

describe('NewProductPage', () => {
  it('should render the title and the product form with correct translations', async () => {
    const ResolvedPage = await NewProductPage();
    render(ResolvedPage);

    expect(
      screen.getByRole('heading', { name: 'Create new Product' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Enter Product information below to create a new Product.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
