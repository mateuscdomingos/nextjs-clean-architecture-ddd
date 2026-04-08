import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { GetProductByIdUseCase } from './GetProductByIdUseCase.class';
import { getProductByIdUseCase } from './getProductByIdUseCase.fn';
import { Product } from '@/core/domain/Product/Product.class';

describe('GetProductByIdUseCase', () => {
  const mockProductId = 'product-uuid-123';
  const mockStoreId = 'store-uuid-789';

  const mockProduct = new Product({
    id: mockProductId,
    name: 'Espresso Beans',
    priceInCents: 1500,
    storeId: mockStoreId,
    minimumStockQuantity: 5,
    roast: 'medium',
    stockQuantity: 10,
    unit: 'un.',
  });

  describe('Paradigm: Object-Oriented (OOP)', () => {
    let productRepository: Partial<ProductRepository>;

    beforeEach(() => {
      productRepository = {
        findById: jest.fn().mockResolvedValue(mockProduct),
      };
      jest.clearAllMocks();
    });

    it('should return a product by its id via class', async () => {
      const useCase = new GetProductByIdUseCase(
        productRepository as ProductRepository,
      );

      const result = await useCase.execute(mockProductId);

      expect(productRepository.findById).toHaveBeenCalledWith(mockProductId);
      expect(result).toEqual(mockProduct);
      expect(result?.props.name).toBe('Espresso Beans');
    });

    it('should return null if the product is not found via class', async () => {
      (productRepository.findById as jest.Mock).mockResolvedValue(null);
      const useCase = new GetProductByIdUseCase(
        productRepository as ProductRepository,
      );

      const result = await useCase.execute('invalid-id');

      expect(result).toBeNull();
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let productRepository: Partial<ProductRepository>;

    beforeEach(() => {
      productRepository = {
        findById: jest.fn().mockResolvedValue(mockProduct),
      };
      jest.clearAllMocks();
    });

    it('should return a product by its id via function', async () => {
      const useCase = getProductByIdUseCase(
        productRepository as ProductRepository,
      );

      const result = await useCase(mockProductId);

      expect(productRepository.findById).toHaveBeenCalledWith(mockProductId);
      expect(result).toEqual(mockProduct);
    });

    it('should return null if the product is not found via function', async () => {
      (productRepository.findById as jest.Mock).mockResolvedValue(null);
      const useCase = getProductByIdUseCase(
        productRepository as ProductRepository,
      );

      const result = await useCase('invalid-id');

      expect(result).toBeNull();
    });
  });
});
