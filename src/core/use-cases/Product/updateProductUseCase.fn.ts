import { Product } from '@/core/domain/Product/Product.class';
import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { Logger } from '@/core/ports/services/Logger';
import { UpdateProductProps } from './UpdateProductUseCase.class';

export const updateProductUseCase =
  (productRepository: ProductRepository, logger: Logger) =>
  async (data: UpdateProductProps) => {
    logger.info('updateProductUseCase', 'Initializing product update', {
      id: data.id,
      storeId: data.storeId,
    });

    const existingProduct = await productRepository.findById(data.id);

    if (!existingProduct) {
      logger.error('updateProductUseCase', 'Product not found for update', {
        id: data.id,
      });
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

    await productRepository.save(updatedProduct);

    logger.info('updateProductUseCase', 'Product successfully updated', {
      id: updatedProduct.props.id,
      name: updatedProduct.props.name,
    });

    return updatedProduct.props;
  };
