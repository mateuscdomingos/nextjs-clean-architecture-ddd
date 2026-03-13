import { auth } from '@/auth';
import { CreateProductUseCaseFactory } from '@/infra/factories/CreateProductUseCaseFactory';
import { handleCreateProduct } from './create';
import { createFormData } from '../test/utils/form-data-utils';
import { CreateProductUseCase } from '@/core/use-cases/Product/CreateProductUseCase.class';
import { revalidatePath } from 'next/cache';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

jest.mock('@/infra/factories/CreateProductUseCaseFactory', () => ({
  CreateProductUseCaseFactory: {
    makeCreateProductUseCase: jest.fn(),
    makeLogger: jest.fn(() => ({ error: jest.fn() })),
  },
}));

describe('handleCreateProduct Server Action', () => {
  let mockExecute: jest.Mock;
  const mockUserId = 'user-123';
  const mockStoreId = 'store-789';

  const validProductData = {
    storeId: mockStoreId,
    name: 'Café Especial Etíope',
    roast: 'light',
    priceInCents: '4500',
    stockQuantity: '10',
    minimumStockQuantity: '2',
    unit: 'un',
  };

  const validFormData = createFormData(validProductData);

  beforeEach(() => {
    jest.clearAllMocks();
    mockExecute = jest.fn();

    (
      CreateProductUseCaseFactory.makeCreateProductUseCase as jest.Mock
    ).mockReturnValue({
      execute: mockExecute,
    } as unknown as jest.Mocked<CreateProductUseCase>);

    (auth as jest.Mock).mockResolvedValue({
      user: { id: mockUserId },
    });
  });

  it('should return success and revalidate the correct path on success', async () => {
    const result = await handleCreateProduct(undefined, validFormData);

    expect(revalidatePath).toHaveBeenCalledWith(
      `/stores/${mockStoreId}/inventory`,
    );
    expect(result).toEqual({ success: true });
    expect(mockExecute).toHaveBeenCalledWith({
      name: 'Café Especial Etíope',
      roast: 'light',
      priceInCents: 4500,
      stockQuantity: 10,
      minimumStockQuantity: 2,
      unit: 'un',
      storeId: mockStoreId,
    });
  });

  describe('Authorization & Context', () => {
    it('should return Unauthorized if there is no session', async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await handleCreateProduct(undefined, validFormData);

      expect(result).toEqual({ error: { generic: 'Unauthorized' } });
      expect(mockExecute).not.toHaveBeenCalled();
    });

    it('should return error if Store ID is missing', async () => {
      const { storeId: undefined, ...dataWithoutStoreId } = validProductData;
      const invalidFormData = createFormData(dataWithoutStoreId);

      const result = await handleCreateProduct(undefined, invalidFormData);

      expect(result).toEqual({ error: { generic: 'Store ID is required' } });
    });
  });

  describe('Validation', () => {
    it('should return error message when required fields are missing', async () => {
      const invalidData = createFormData({
        storeId: mockStoreId,
        name: 'Short',
      });

      const result = await handleCreateProduct(undefined, invalidData);

      expect(result).toEqual({
        error: { generic: 'Invalid fields. Please check your data.' },
      });
    });

    it('should return error when roast type is invalid', async () => {
      const invalidData = createFormData({
        ...validProductData,
        roast: 'burnt',
      });

      const result = await handleCreateProduct(undefined, invalidData);

      expect(result).toEqual({
        error: { generic: 'Invalid fields. Please check your data.' },
      });
    });
  });

  describe('Unexpected Errors', () => {
    it('should return "Unknown error" and log it when use case fails', async () => {
      const mockLoggerError = jest.fn();
      (CreateProductUseCaseFactory.makeLogger as jest.Mock).mockReturnValue({
        error: mockLoggerError,
      });

      mockExecute.mockRejectedValue(new Error('Persistence failed'));

      const result = await handleCreateProduct(undefined, validFormData);

      expect(result).toEqual({ error: { generic: 'Unknown error' } });
      expect(mockLoggerError).toHaveBeenCalled();
    });
  });
});
