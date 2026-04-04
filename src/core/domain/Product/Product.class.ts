import { FieldCannotBeNegative } from '../Error/Error.class';
import { ProductProps } from './product.types';

export class Product {
  constructor(public readonly props: ProductProps) {
    this.validateQuantity(props.stockQuantity, 'stockQuantity');
    this.validateQuantity(props.minimumStockQuantity, 'minimumStockQuantity');
  }

  private validateQuantity(quantity: number, fieldName: string): void {
    if (quantity < 0) {
      throw new FieldCannotBeNegative(fieldName);
    }
  }

  updateStockQuantity(quantity: number) {
    this.validateQuantity(quantity, 'stockQuantity');
    return new Product({ ...this.props, stockQuantity: quantity });
  }

  incrementStock() {
    return this.updateStockQuantity(this.props.stockQuantity + 1);
  }

  decrementStock() {
    return this.updateStockQuantity(this.props.stockQuantity - 1);
  }

  updateMinimumStockQuantity(quantity: number) {
    this.validateQuantity(quantity, 'minimumStockQuantity');
    return new Product({ ...this.props, minimumStockQuantity: quantity });
  }
}
