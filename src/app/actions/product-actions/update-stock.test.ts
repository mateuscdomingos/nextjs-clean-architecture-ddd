import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { UpdateProductQuantityUseCaseFactory } from '@/infra/factories/UpdateProductQuantityUseCaseFactory';
import { handleUpdateStockQuantity } from './update-stock';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

jest.mock('@/infra/factories/UpdateProductQuantityUseCaseFactory', () => ({
  UpdateProductQuantityUseCaseFactory: {
    makeUpdateProductQuantityUseCase: jest.fn(),
    makeLogger: jest.fn(() => ({ error: jest.fn() })),
  },
}));

describe('handleUpdateStockQuantity Server Action', () => {
  let mockExecute: jest.Mock;
  const mockStoreId = 'store-789';
  const mockProductId = 'prod-123';

  const validArgs = {
    productId: mockProductId,
    storeId: mockStoreId,
    type: 'increment' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockExecute = jest.fn();

    (
      UpdateProductQuantityUseCaseFactory.makeUpdateProductQuantityUseCase as jest.Mock
    ).mockReturnValue({
      execute: mockExecute,
    });

    (auth as jest.Mock).mockResolvedValue({
      user: { id: 'user-123' },
    });
  });

  it('should return success and revalidate the correct path on success', async () => {
    mockExecute.mockResolvedValue({ stockQuantity: 11 });

    const result = await handleUpdateStockQuantity(validArgs);

    expect(mockExecute).toHaveBeenCalledWith({
      productId: mockProductId,
      type: 'increment',
    });

    expect(revalidatePath).toHaveBeenCalledWith(
      `/stores/${mockStoreId}/inventory`,
    );
    expect(result).toEqual({ success: true });
  });

  describe('Authorization', () => {
    it('should return Unauthorized if there is no session', async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await handleUpdateStockQuantity(validArgs);

      expect(result).toEqual({ error: 'Unauthorized' });
      expect(mockExecute).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should return the error message when use case throws an error', async () => {
      const errorMessage = 'Unknown error';
      mockExecute.mockRejectedValue(new Error(errorMessage));

      const result = await handleUpdateStockQuantity({
        ...validArgs,
        type: 'decrement',
      });

      expect(result).toEqual({ error: { generic: errorMessage } });
    });

    it('should log the error when an exception occurs', async () => {
      const mockLoggerError = jest.fn();
      (
        UpdateProductQuantityUseCaseFactory.makeLogger as jest.Mock
      ).mockReturnValue({
        error: mockLoggerError,
      });

      const error = new Error('Database connection failed');
      mockExecute.mockRejectedValue(error);

      await handleUpdateStockQuantity(validArgs);

      expect(mockLoggerError).toHaveBeenCalledWith(
        'handleUpdateStockQuantity',
        expect.stringContaining(
          `Error updating stock for product ${mockProductId}`,
        ),
        error,
      );
    });
  });
});
