import { ProductRepository } from '@/core/ports/repositories/ProductRepository';

export class GetProductByStoreIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(storeId: string) {
    return await this.productRepository.findAllByStoreId(storeId);
  }
}
