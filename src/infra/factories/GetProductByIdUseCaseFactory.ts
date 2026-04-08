import { getProductByIdUseCase } from '@/core/use-cases/Product/getProductByIdUseCase.fn';
import { PrismaProductRepository } from '../database/prisma/PrismaProductRepository';

export class GetProductByIdUseCaseFactory {
  static makeGetProductById() {
    const repository = new PrismaProductRepository();
    return getProductByIdUseCase(repository);
  }
}
