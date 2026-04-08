import { ProductRepository } from '@/core/ports/repositories/ProductRepository';

export const getProductByIdUseCase =
  (productRepository: ProductRepository) => async (productId: string) => {
    return await productRepository.findById(productId);
  };
