import { CreateProductUseCase } from '@/core/use-cases/Product/CreateProductUseCase.class';
import { ConsoleLogger } from '../services/logger/ConsoleLogger.class';
import { PrismaProductRepository } from '../database/prisma/PrismaProductRepository';

export class CreateProductUseCaseFactory {
  static makeCreateProductUseCase() {
    const productRepository = new PrismaProductRepository();
    const logger = new ConsoleLogger();

    return new CreateProductUseCase(productRepository, logger);
  }

  static makeLogger() {
    return new ConsoleLogger();
  }
}
