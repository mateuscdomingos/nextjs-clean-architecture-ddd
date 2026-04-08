import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { Logger } from '@/core/ports/services/Logger';
import { Product } from '@/core/domain/Product/Product.class';
import {
  UpdateProductUseCase,
  UpdateProductProps,
} from './UpdateProductUseCase.class';
import { updateProductUseCase } from './updateProductUseCase.fn';

describe('UpdateProductUseCase', () => {
  let productRepository: jest.Mocked<ProductRepository>;
  let logger: jest.Mocked<Logger>;

  const mockProductData: UpdateProductProps = {
    id: 'prod-123',
    name: 'Premium Coffee Edited',
    roast: 'dark',
    priceInCents: 5500,
    stockQuantity: 15,
    minimumStockQuantity: 5,
    unit: 'kg',
    storeId: 'store-789',
  };

  const existingProduct = new Product({
    ...mockProductData,
    name: 'Old Coffee',
  });

  beforeEach(() => {
    productRepository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(existingProduct),
      findAllByStoreId: jest.fn(),
    } as unknown as jest.Mocked<ProductRepository>;

    logger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    } as unknown as jest.Mocked<Logger>;

    jest.clearAllMocks();
  });

  describe('Paradigm: Object-Oriented (OOP)', () => {
    it('should update a product successfully via class', async () => {
      const useCase = new UpdateProductUseCase(productRepository, logger);

      const result = await useCase.execute(mockProductData);

      expect(productRepository.findById).toHaveBeenCalledWith(
        mockProductData.id,
      );
      expect(productRepository.save).toHaveBeenCalledWith(expect.any(Product));
      expect(result.name).toBe(mockProductData.name);
      expect(logger.info).toHaveBeenCalled();
    });

    it('should throw an error if product to update is not found via class', async () => {
      productRepository.findById.mockResolvedValue(null);
      const useCase = new UpdateProductUseCase(productRepository, logger);

      await expect(useCase.execute(mockProductData)).rejects.toThrow(
        'Product not found',
      );
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    it('should update a product successfully via function', async () => {
      const useCase = updateProductUseCase(productRepository, logger);

      const result = await useCase(mockProductData);

      expect(productRepository.findById).toHaveBeenCalledWith(
        mockProductData.id,
      );
      expect(productRepository.save).toHaveBeenCalledWith(expect.any(Product));
      expect(result.id).toBe(mockProductData.id);
      expect(logger.info).toHaveBeenCalled();
    });

    it('should throw an error if product to update is not found via function', async () => {
      productRepository.findById.mockResolvedValue(null);
      const useCase = updateProductUseCase(productRepository, logger);

      await expect(useCase(mockProductData)).rejects.toThrow(
        'Product not found',
      );
      expect(logger.error).toHaveBeenCalled();
    });
  });
});
