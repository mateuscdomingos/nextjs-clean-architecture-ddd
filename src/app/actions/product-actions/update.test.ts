import { auth } from '@/auth';
import { UpdateProductUseCaseFactory } from '@/infra/factories/UpdateProductUseCaseFactory';
import { handleUpdateProduct } from './update';
import { createFormData } from '../test/utils/form-data-utils';
import { UpdateProductUseCase } from '@/core/use-cases/Product/UpdateProductUseCase.class';
import { revalidatePath } from 'next/cache';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

jest.mock('@/infra/factories/UpdateProductUseCaseFactory', () => ({
  UpdateProductUseCaseFactory: {
    makeUpdateProductUseCase: jest.fn(),
    makeLogger: jest.fn(() => ({ error: jest.fn() })),
  },
}));

describe('handleUpdateProduct Server Action', () => {
  let mockExecute: jest.Mock;
  const mockUserId = 'user-123';
  const mockStoreId = 'store-789';
  const mockProductId = 'prod-456';

  const validProductData = {
    id: mockProductId,
    storeId: mockStoreId,
    name: 'Specialty Coffee',
    roast: 'medium',
    priceInCents: '5000',
    stockQuantity: '20',
    minimumStockQuantity: '5',
    unit: 'kg',
  };

  const validFormData = createFormData(validProductData);

  beforeEach(() => {
    jest.clearAllMocks();
    mockExecute = jest.fn();

    (
      UpdateProductUseCaseFactory.makeUpdateProductUseCase as jest.Mock
    ).mockReturnValue({
      execute: mockExecute,
    } as unknown as jest.Mocked<UpdateProductUseCase>);

    (auth as jest.Mock).mockResolvedValue({
      user: { id: mockUserId },
    });
  });

  it('should return success and revalidate the correct path on success', async () => {
    const result = await handleUpdateProduct(undefined, validFormData);

    expect(revalidatePath).toHaveBeenCalledWith(
      `/stores/${mockStoreId}/inventory`,
    );
    expect(result).toEqual({ success: true });
    expect(mockExecute).toHaveBeenCalledWith({
      id: mockProductId,
      storeId: mockStoreId,
      name: 'Specialty Coffee',
      roast: 'medium',
      priceInCents: 5000,
      stockQuantity: 20,
      minimumStockQuantity: 5,
      unit: 'kg',
    });
  });

  describe('Authorization & Context', () => {
    it('should return Unauthorized if there is no session', async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await handleUpdateProduct(undefined, validFormData);

      expect(result).toEqual({ error: { generic: 'Unauthorized' } });
      expect(mockExecute).not.toHaveBeenCalled();
    });

    it('should return error if Product ID is missing', async () => {
      const { id: _, ...dataWithoutId } = validProductData;
      const invalidFormData = createFormData(dataWithoutId);

      const result = await handleUpdateProduct(undefined, invalidFormData);

      expect(result).toEqual({
        error: { generic: 'Product ID and Store ID are required' },
      });
    });

    it('should return error if Store ID is missing', async () => {
      const { storeId: _, ...dataWithoutStoreId } = validProductData;
      const invalidFormData = createFormData(dataWithoutStoreId);

      const result = await handleUpdateProduct(undefined, invalidFormData);

      expect(result).toEqual({
        error: { generic: 'Product ID and Store ID are required' },
      });
    });
  });

  describe('Validation', () => {
    it('should return error message when zod validation fails', async () => {
      const invalidData = createFormData({
        ...validProductData,
        name: '',
      });

      const result = await handleUpdateProduct(undefined, invalidData);

      expect(result).toEqual({
        error: { generic: 'Invalid fields. Please check your data.' },
      });
    });
  });

  describe('Unexpected Errors', () => {
    it('should return "Unknown error" and log it when use case fails', async () => {
      const mockLoggerError = jest.fn();
      (UpdateProductUseCaseFactory.makeLogger as jest.Mock).mockReturnValue({
        error: mockLoggerError,
      });

      mockExecute.mockRejectedValue(new Error('Database update failed'));

      const result = await handleUpdateProduct(undefined, validFormData);

      expect(result).toEqual({ error: { generic: 'Unknown error' } });
      expect(mockLoggerError).toHaveBeenCalledWith(
        'handleUpdateProduct',
        `Error in handleUpdateProduct for ID ${mockProductId}:`,
        expect.any(Error),
      );
    });
  });
});
