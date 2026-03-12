import { getProductByStoreIdUseCase } from '@/core/use-cases/Product/getProductByStoreIdUseCase.fn';
import { PrismaProductRepository } from '../database/prisma/PrismaProductRepository';

export class GetProductByStoreIdUseCaseFactory {
  static makeGetProductByStoreId() {
    const repository = new PrismaProductRepository();
    return getProductByStoreIdUseCase(repository);
  }
}
