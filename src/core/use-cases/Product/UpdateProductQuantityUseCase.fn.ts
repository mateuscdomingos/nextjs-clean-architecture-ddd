import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { Logger } from '@/core/ports/services/Logger';
import { ProductProps } from '@/core/domain/Product/product.types';

export interface UpdateProductQuantityProps {
  productId: string;
  type: 'increment' | 'decrement';
}

export const updateProductQuantityUseCase =
  (productRepository: ProductRepository, logger: Logger) =>
  async (data: UpdateProductQuantityProps): Promise<ProductProps> => {
    logger.info(
      updateProductQuantityUseCase.name,
      'Initializing product quantity update',
      { productId: data.productId, type: data.type },
    );

    const product = await productRepository.findById(data.productId);

    if (!product) {
      logger.error(updateProductQuantityUseCase.name, 'Product not found', {
        productId: data.productId,
      });
      throw new Error('Product not found');
    }

    const updatedProduct =
      data.type === 'decrement'
        ? product.decrementStock()
        : product.incrementStock();

    await productRepository.save(updatedProduct);

    logger.info(
      updateProductQuantityUseCase.name,
      'Product quantity successfully updated',
      {
        id: updatedProduct.props.id,
        newQuantity: updatedProduct.props.stockQuantity,
      },
    );

    return updatedProduct.props;
  };
