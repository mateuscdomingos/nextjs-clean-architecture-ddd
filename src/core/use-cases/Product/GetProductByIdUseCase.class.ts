import { ProductRepository } from '@/core/ports/repositories/ProductRepository';

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string) {
    return await this.productRepository.findById(productId);
  }
}
