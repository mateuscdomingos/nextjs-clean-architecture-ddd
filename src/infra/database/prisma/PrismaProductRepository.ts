import { Product } from '@/core/domain/Product/Product.class';
import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { prisma } from './prisma-client';

export class PrismaProductRepository implements ProductRepository {
  private prisma = prisma;

  async save(product: Product): Promise<void> {
    const { props } = product;

    await this.prisma.product.upsert({
      where: { id: props.id },
      update: {
        name: props.name,
        roast: props.roast,
        priceInCents: props.priceInCents,
        stockQuantity: props.stockQuantity,
        minimumStockQuantity: props.minimumStockQuantity,
        unit: props.unit,
      },
      create: {
        id: props.id,
        name: props.name,
        roast: props.roast,
        priceInCents: props.priceInCents,
        stockQuantity: props.stockQuantity,
        minimumStockQuantity: props.minimumStockQuantity,
        unit: props.unit,
        storeId: props.storeId,
      },
    });
  }

  async findById(id: string): Promise<Product | null> {
    const data = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Product({
      id: data.id,
      name: data.name,
      roast: data.roast as 'light' | 'medium' | 'dark',
      priceInCents: data.priceInCents,
      stockQuantity: data.stockQuantity,
      minimumStockQuantity: data.minimumStockQuantity,
      unit: data.unit,
      storeId: data.storeId,
    });
  }

  async findAllByStoreId(storeId: string): Promise<Product[]> {
    const productsData = await this.prisma.product.findMany({
      where: { storeId },
      orderBy: { name: 'asc' },
    });

    return productsData.map((data) => {
      return new Product({
        id: data.id,
        name: data.name,
        roast: data.roast as 'light' | 'medium' | 'dark',
        priceInCents: data.priceInCents,
        stockQuantity: data.stockQuantity,
        minimumStockQuantity: data.minimumStockQuantity,
        unit: data.unit,
        storeId: data.storeId,
      });
    });
  }
}
