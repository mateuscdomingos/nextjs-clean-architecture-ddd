import { auth } from '@/auth';
import { CreateStoreUseCaseFactory } from '@/infra/factories/CreateStoreUseCaseFactory';
import { handleCreateStore } from './create';
import { createFormData } from '../test/utils/form-data-utils';
import { CreateStoreUseCase } from '@/core/use-cases/Store/CreateStoreUseCase.class';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

jest.mock('@/infra/factories/CreateStoreUseCaseFactory', () => ({
  CreateStoreUseCaseFactory: {
    makeCreateStoreUseCase: jest.fn(),
    makeLogger: jest.fn(() => ({ error: jest.fn() })),
  },
}));

import { revalidatePath } from 'next/cache';

describe('handleCreateStore Server Action', () => {
  let mockExecute: jest.Mock;
  const mockUserId = 'user-123';

  const validFormData = createFormData({
    name: 'New Store',
    monthlyBudgetInCents: '50000',
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockExecute = jest.fn();

    (
      CreateStoreUseCaseFactory.makeCreateStoreUseCase as jest.Mock
    ).mockReturnValue({
      execute: mockExecute,
    } as unknown as jest.Mocked<CreateStoreUseCase>);

    (auth as jest.Mock).mockResolvedValue({
      user: { id: mockUserId },
    });
  });

  it('should return success on success', async () => {
    const result = await handleCreateStore(undefined, validFormData);

    expect(revalidatePath).toHaveBeenCalledWith('/stores');
    expect(result).toEqual({ success: true });
    expect(mockExecute).toHaveBeenCalledWith({
      name: 'New Store',
      monthlyBudgetInCents: 50000,
      userId: mockUserId,
    });
  });

  describe('Authentication', () => {
    it('should return Unauthorized if there is no session', async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await handleCreateStore(undefined, validFormData);

      expect(result).toEqual({ error: { generic: 'Unauthorized' } });
      expect(mockExecute).not.toHaveBeenCalled();
    });
  });

  describe('Validation', () => {
    it('should return invalid fields message when name is missing', async () => {
      const invalidData = createFormData({
        monthlyBudgetInCents: '50000',
      });

      const result = await handleCreateStore(undefined, invalidData);

      expect(result).toEqual({
        error: { generic: 'Invalid fields. Please check your data.' },
      });
      expect(mockExecute).not.toHaveBeenCalled();
    });

    it('should return invalid fields message when budget is not a number', async () => {
      const invalidData = createFormData({
        name: 'New Store',
        monthlyBudgetInCents: 'abc',
      });

      const result = await handleCreateStore(undefined, invalidData);

      expect(result).toEqual({
        error: { generic: 'Invalid fields. Please check your data.' },
      });
    });
  });

  describe('Unexpected Errors', () => {
    it('should return "Unknown error" when use case throws', async () => {
      mockExecute.mockRejectedValue(new Error('Database failure'));
      const result = await handleCreateStore(undefined, validFormData);

      expect(result).toEqual({ error: { generic: 'Unknown error' } });
    });
  });
});
