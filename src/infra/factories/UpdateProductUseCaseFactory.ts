import { UpdateProductUseCase } from '@/core/use-cases/Product/UpdateProductUseCase.class';
import { ConsoleLogger } from '../services/logger/ConsoleLogger.class';
import { PrismaProductRepository } from '../database/prisma/PrismaProductRepository';

export class UpdateProductUseCaseFactory {
  static makeUpdateProductUseCase() {
    const productRepository = new PrismaProductRepository();

    const logger = new ConsoleLogger();

    return new UpdateProductUseCase(productRepository, logger);
  }

  static makeLogger() {
    return new ConsoleLogger();
  }
}
