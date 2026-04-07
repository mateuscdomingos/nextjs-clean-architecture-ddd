import { ProductForm } from './add-product-form';
import React from 'react';
import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { handleCreateProduct } from '@/app/actions/product-actions';
import { toast } from 'sonner';

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
}));

describe('ProductForm', () => {
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
    expect(
      screen.getByRole('spinbutton', { name: 'Min Stock' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Unit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
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
    it('should display success toast and reset form on success', () => {
      jest
        .spyOn(React, 'useActionState')
        .mockReturnValue([{ success: true }, jest.fn(), false]);

      render(<ProductForm />);

      expect(toast.success).toHaveBeenCalledWith('Product Created');
      expect(mockPush).toHaveBeenCalledWith('/stores/store-123/inventory');
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

  describe('Behavior & Data Mapping', () => {
    it('should submit correct FormData including storeId from params', async () => {
      render(<ProductForm />);

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Name' }),
        'Café Bravo',
      );

      const priceInput = screen.getByRole('textbox', { name: 'Price' });
      await userEvent.type(priceInput, '5000');

      await userEvent.type(
        screen.getByRole('spinbutton', { name: 'Stock' }),
        '10',
      );
      await userEvent.type(
        screen.getByRole('spinbutton', { name: 'Min Stock' }),
        '2',
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(handleCreateProduct).toHaveBeenCalled();
      });

      const formData = (handleCreateProduct as jest.Mock).mock.calls[0][1];

      expect(formData.get('storeId')).toBe('store-123');
      expect(formData.get('name')).toBe('Café Bravo');
      expect(formData.get('priceInCents')).toBe('5000');
      expect(formData.get('stockQuantity')).toBe('10');
      expect(formData.get('roast')).toBe('medium');
    });
  });
});
