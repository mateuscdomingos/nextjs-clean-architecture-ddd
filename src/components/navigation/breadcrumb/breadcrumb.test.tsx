import { render, screen } from '@/test/test-utils';
import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb', () => {
  const mockItems = [
    { label: 'Stores', href: '/stores' },
    { label: 'My Coffee Shop', href: '/stores/123' },
    { label: 'Inventory' },
  ];

  it('should render all labels provided', () => {
    render(<Breadcrumb items={mockItems} />);

    expect(screen.getByText('Stores')).toBeInTheDocument();
    expect(screen.getByText('My Coffee Shop')).toBeInTheDocument();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
  });

  it('should render links for items with href that are not last', () => {
    render(<Breadcrumb items={mockItems} />);

    const storesLink = screen.getByRole('link', { name: 'Stores' });
    const shopLink = screen.getByRole('link', { name: 'My Coffee Shop' });

    expect(storesLink).toHaveAttribute('href', '/stores');
    expect(shopLink).toHaveAttribute('href', '/stores/123');
  });

  it('should render the last item as a static page (not a link)', () => {
    render(<Breadcrumb items={mockItems} />);

    const lastItem = screen.getByText('Inventory');

    expect(lastItem.tagName).not.toBe('A');
    screen.debug();
    expect(screen.queryByRole('link', { name: 'Inventory' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('should render the correct number of separators', () => {
    const { container } = render(<Breadcrumb items={mockItems} />);

    const separators = container.querySelectorAll(
      '[data-slot="breadcrumb-separator"]',
    );
    expect(separators.length).toBe(mockItems.length - 1);
  });
});
