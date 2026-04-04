import { FieldCannotBeNegative } from '../Error/Error.class';
import { Product, ProductProps } from './product.types';

const validateQuantity = (quantity: number, fieldName: string): void => {
  if (quantity < 0) {
    throw new FieldCannotBeNegative(fieldName);
  }
};

export const createProduct = (props: ProductProps): Product => {
  validateQuantity(props.stockQuantity, 'stockQuantity');
  validateQuantity(props.minimumStockQuantity, 'minimumStockQuantity');

  return Object.freeze({ ...props });
};

export const updateStockQuantity = (
  product: Product,
  quantity: number,
): Product => {
  validateQuantity(quantity, 'stockQuantity');
  return { ...product, stockQuantity: quantity };
};

export const incrementStock = (product: Product): Product => {
  return updateStockQuantity(product, product.stockQuantity + 1);
};

export const decrementStock = (product: Product): Product => {
  return updateStockQuantity(product, product.stockQuantity - 1);
};

export const updateMinimumStockQuantity = (
  product: Product,
  quantity: number,
): Product => {
  validateQuantity(quantity, 'minimumStockQuantity');
  return { ...product, minimumStockQuantity: quantity };
};
