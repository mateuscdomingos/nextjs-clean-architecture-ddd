import { Product } from '@/core/domain/Product/Product.class';
import { ProductProps } from '@/core/domain/Product/product.types';
import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { Logger } from '@/core/ports/services/Logger';

export type UpdateProductProps = ProductProps;

export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: UpdateProductProps) {
    this.logger.info(UpdateProductUseCase.name, 'Initializing product update', {
      id: data.id,
      storeId: data.storeId,
    });

    const existingProduct = await this.productRepository.findById(data.id);

    if (!existingProduct) {
      this.logger.error(
        UpdateProductUseCase.name,
        'Product not found for update',
        { id: data.id },
      );
      throw new Error('Product not found');
    }

    const updatedProduct = new Product({
      id: data.id,
      name: data.name,
      roast: data.roast,
      priceInCents: data.priceInCents,
      stockQuantity: data.stockQuantity,
      minimumStockQuantity: data.minimumStockQuantity,
      unit: data.unit,
      storeId: data.storeId,
    });

    await this.productRepository.save(updatedProduct);

    this.logger.info(
      UpdateProductUseCase.name,
      'Product successfully updated',
      {
        id: updatedProduct.props.id,
        name: updatedProduct.props.name,
      },
    );

    return updatedProduct.props;
  }
}
