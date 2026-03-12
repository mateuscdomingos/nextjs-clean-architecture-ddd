import { ProductRepository } from '@/core/ports/repositories/ProductRepository';

export const getProductByStoreIdUseCase =
  (productRepository: ProductRepository) => async (storeId: string) => {
    return await productRepository.findAllByStoreId(storeId);
  };
