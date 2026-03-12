import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { GetProductByStoreIdUseCase } from './GetProductByStoreIdUseCase.class';
import { getProductByStoreIdUseCase } from './getProductByStoreIdUseCase.fn';
import { Product } from '@/core/domain/Product/Product.class';

describe('GetProductByStoreIdUseCase', () => {
  const mockStoreId = 'store-uuid-123';

  const mockProducts = [
    new Product({
      id: 'product-1',
      name: 'Espresso Beans',
      priceInCents: 1500,
      storeId: mockStoreId,
      minimumStockQuantity: 0,
      roast: 'medium',
      stockQuantity: 0,
      unit: 'un.',
    }),
    new Product({
      id: 'product-2',
      name: 'Milk Frother',
      priceInCents: 4500,
      storeId: mockStoreId,
      minimumStockQuantity: 0,
      roast: 'medium',
      stockQuantity: 0,
      unit: 'un.',
    }),
  ];

  describe('Paradigm: Object-Oriented (OOP)', () => {
    let productRepository: ProductRepository;

    beforeEach(() => {
      productRepository = {
        save: jest.fn(),
        findById: jest.fn(),
        findAllByStoreId: jest.fn().mockResolvedValue(mockProducts),
      };
      jest.clearAllMocks();
    });

    it('should return all products for a given store via class', async () => {
      const useCase = new GetProductByStoreIdUseCase(productRepository);

      const result = await useCase.execute(mockStoreId);

      expect(productRepository.findAllByStoreId).toHaveBeenCalledWith(
        mockStoreId,
      );
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if the store has no products', async () => {
      (productRepository.findAllByStoreId as jest.Mock).mockResolvedValue([]);
      const useCase = new GetProductByStoreIdUseCase(productRepository);

      const result = await useCase.execute(mockStoreId);

      expect(result).toEqual([]);
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let productRepository: ProductRepository;

    beforeEach(() => {
      productRepository = {
        save: jest.fn(),
        findById: jest.fn(),
        findAllByStoreId: jest.fn().mockResolvedValue(mockProducts),
      };
      jest.clearAllMocks();
    });

    it('should return all products for a given store via function', async () => {
      const useCase = getProductByStoreIdUseCase(productRepository);

      const result = await useCase(mockStoreId);

      expect(productRepository.findAllByStoreId).toHaveBeenCalledWith(
        mockStoreId,
      );
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if the store has no products via function', async () => {
      (productRepository.findAllByStoreId as jest.Mock).mockResolvedValue([]);
      const useCase = getProductByStoreIdUseCase(productRepository);

      const result = await useCase(mockStoreId);

      expect(result).toEqual([]);
    });
  });
});
