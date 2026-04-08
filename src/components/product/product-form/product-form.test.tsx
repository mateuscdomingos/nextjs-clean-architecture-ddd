import { ProductForm } from './product-form';
import React from 'react';
import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import {
  handleCreateProduct,
  handleUpdateProduct,
} from '@/app/actions/product-actions';
import { toast } from 'sonner';
import { ProductProps } from '@/core/domain/Product/product.types';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({
    id: 'store-123',
  }),
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock('@/app/actions/product-actions', () => ({
  handleCreateProduct: jest.fn(),
  handleUpdateProduct: jest.fn(),
}));

describe('ProductForm', () => {
  const mockInitialData: ProductProps = {
    id: 'prod-999',
    name: 'Grão Especial',
    roast: 'dark',
    priceInCents: 4500,
    stockQuantity: 10,
    minimumStockQuantity: 2,
    unit: 'kg',
    storeId: 'store-123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all coffee-specific input fields', () => {
    render(<ProductForm />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByText('Roast Level')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Price' })).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: 'Stock' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  describe('Edit Mode', () => {
    it('should pre-fill form fields when initialData is provided', () => {
      render(<ProductForm initialData={mockInitialData} />);

      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue(
        'Grão Especial',
      );
      const priceInput = screen.getByRole('textbox', {
        name: 'Price',
      }) as HTMLInputElement;
      expect(priceInput.value.replace(/\u00a0/g, ' ')).toBe('R$ 45,00');

      expect(screen.getByRole('spinbutton', { name: 'Stock' })).toHaveValue(10);
      expect(
        screen.getByRole('button', { name: 'Save Changes' }),
      ).toBeInTheDocument();
    });

    it('should call handleUpdateProduct with id when in edit mode', async () => {
      render(<ProductForm initialData={mockInitialData} />);

      const submitButton = screen.getByRole('button', { name: 'Save Changes' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(handleUpdateProduct).toHaveBeenCalled();
      });

      const formData = (handleUpdateProduct as jest.Mock).mock.calls[0][1];
      expect(formData.get('id')).toBe('prod-999');
      expect(formData.get('name')).toBe('Grão Especial');
    });
  });

  describe('Validation', () => {
    it('should show validation error when name is too short', async () => {
      render(<ProductForm />);

      const nameInput = screen.getByRole('textbox', { name: 'Name' });
      await userEvent.type(nameInput, 'ab');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Product name is required'),
        ).toBeInTheDocument();
      });

      expect(handleCreateProduct).not.toHaveBeenCalled();
    });
  });

  describe('Server Action States', () => {
    it('should display success toast for creation', () => {
      jest
        .spyOn(React, 'useActionState')
        .mockReturnValue([{ success: true }, jest.fn(), false]);

      render(<ProductForm />);

      expect(toast.success).toHaveBeenCalledWith('Product Created');
      expect(mockPush).toHaveBeenCalledWith('/stores/store-123/inventory');
    });

    it('should display success toast for update', () => {
      jest
        .spyOn(React, 'useActionState')
        .mockReturnValue([{ success: true }, jest.fn(), false]);

      render(<ProductForm initialData={mockInitialData} />);

      expect(toast.success).toHaveBeenCalledWith('Product updated');
    });

    it('should display generic error message from server', () => {
      jest
        .spyOn(React, 'useActionState')
        .mockReturnValue([
          { error: { generic: 'Server validation failed' } },
          jest.fn(),
          false,
        ]);

      render(<ProductForm />);

      expect(screen.getByText('Server validation failed')).toBeInTheDocument();
    });
  });

  describe('Behavior & Data Mapping (Create)', () => {
    it('should submit correct FormData for creation', async () => {
      render(<ProductForm />);

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Name' }),
        'Café Bravo',
      );
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Price' }),
        '50,00',
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(handleCreateProduct).toHaveBeenCalled();
      });

      const formData = (handleCreateProduct as jest.Mock).mock.calls[0][1];
      expect(formData.get('storeId')).toBe('store-123');
      expect(formData.get('id')).toBeNull();
    });
  });
});
