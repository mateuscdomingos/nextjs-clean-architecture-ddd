import { Product } from './Product.class';
import * as productFP from './product.fn';
import { ProductProps } from './product.types';

describe('Domain: Product', () => {
  describe('Paradigm: Object-Oriented (OOP)', () => {
    describe('when creating a product', () => {
      it('should create a product instance', () => {
        const product = new Product({
          id: '1',
          name: 'Coffee Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 10,
          unit: 'kg',
          storeId: 'store-123',
        });

        expect(product.props.id).toBe('1');
        expect(product.props.name).toBe('Coffee Beans');
        expect(product.props.priceInCents).toBe(1599);
        expect(product.props.roast).toBe('light');
        expect(product.props.stockQuantity).toBe(100);
        expect(product.props.minimumStockQuantity).toBe(10);
        expect(product.props.unit).toBe('kg');
        expect(product.props.storeId).toBe('store-123');
      });

      it('should throw an error for negative stock quantity', () => {
        expect(
          () =>
            new Product({
              id: '1',
              name: 'Coffee Beans',
              priceInCents: 1599,
              roast: 'light',
              stockQuantity: -10,
              minimumStockQuantity: 10,
              unit: 'kg',
              storeId: 'store-123',
            }),
        ).toThrow('"stockQuantity" cannot be negative');
      });

      it('should throw an error for negative minimum stock quantity', () => {
        expect(
          () =>
            new Product({
              id: '1',
              name: 'Coffee Beans',
              priceInCents: 1599,
              roast: 'light',
              stockQuantity: 100,
              minimumStockQuantity: -5,
              unit: 'kg',
              storeId: 'store-123',
            }),
        ).toThrow('"minimumStockQuantity" cannot be negative');
      });
    });

    describe('updateStockQuantity', () => {
      it('should update stock quantity', () => {
        const product = new Product({
          id: '1',
          name: 'Coffee Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 10,
          unit: 'kg',
          storeId: 'store-123',
        });

        const updatedProduct = product.updateStockQuantity(80);
        expect(updatedProduct.props.stockQuantity).toBe(80);
        expect(product.props.stockQuantity).toBe(100);
      });

      it('should throw error for negative stock quantity', () => {
        const product = new Product({
          id: '1',
          name: 'Coffee Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 10,
          unit: 'kg',
          storeId: 'store-123',
        });

        expect(() => product.updateStockQuantity(-10)).toThrow(
          '"stockQuantity" cannot be negative',
        );
      });

      it('should increment stock quantity by 1', () => {
        const product = new Product({
          id: '1',
          name: 'Coffee Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 10,
          unit: 'kg',
          storeId: 'store-123',
        });
        const updated = product.incrementStock();
        expect(updated.props.stockQuantity).toBe(101);
      });

      it('should decrement stock quantity by 1', () => {
        const product = new Product({
          id: '1',
          name: 'Coffee Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 10,
          unit: 'kg',
          storeId: 'store-123',
        });
        const updated = product.decrementStock();
        expect(updated.props.stockQuantity).toBe(99);
      });

      it('should throw error when decrementing stock below zero', () => {
        const product = new Product({
          id: '1',
          name: 'Coffee Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 0,
          minimumStockQuantity: 10,
          unit: 'kg',
          storeId: 'store-123',
        });
        expect(() => product.decrementStock()).toThrow(
          '"stockQuantity" cannot be negative',
        );
      });
    });

    describe('updateMinimumStockQuantity', () => {
      it('should update minimum stock quantity', () => {
        const product = new Product({
          id: '1',
          name: 'Coffee Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 10,
          unit: 'kg',
          storeId: 'store-123',
        });

        const updatedProduct = product.updateMinimumStockQuantity(5);
        expect(updatedProduct.props.minimumStockQuantity).toBe(5);
        expect(product.props.minimumStockQuantity).toBe(10);
      });

      it('should throw error for negative minimum stock quantity', () => {
        const product = new Product({
          id: '1',
          name: 'Coffee Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 10,
          unit: 'kg',
          storeId: 'store-123',
        });

        expect(() => product.updateMinimumStockQuantity(-10)).toThrow(
          '"minimumStockQuantity" cannot be negative',
        );
      });
    });
  });

  describe('Paradigm: Functional (FP)', () => {
    describe('when creating a Product', () => {
      it('should create a Product with valid properties', () => {
        const productProps: ProductProps = {
          id: 'prod-123',
          name: 'Espresso Beans',
          priceInCents: 1500,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 20,
          unit: 'grams',
          storeId: 'store-123',
        };

        const product = productFP.createProduct(productProps);

        expect(product.id).toBe('prod-123');
        expect(product.name).toBe('Espresso Beans');
        expect(product.roast).toBe('light');
        expect(product.priceInCents).toBe(1500);
        expect(product.stockQuantity).toBe(100);
        expect(product.minimumStockQuantity).toBe(20);
        expect(product.unit).toBe('grams');
        expect(product.storeId).toBe('store-123');
      });

      it('should throw an error if stockQuantity is negative', () => {
        const productProps: ProductProps = {
          id: 'prod-123',
          name: 'Espresso Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: -10,
          minimumStockQuantity: 20,
          unit: 'grams',
          storeId: 'store-123',
        };

        expect(() => productFP.createProduct(productProps)).toThrow(
          '"stockQuantity" cannot be negative',
        );
      });

      it('should throw an error if minimumStockQuantity is negative', () => {
        const productProps: ProductProps = {
          id: 'prod-123',
          name: 'Espresso Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: -5,
          unit: 'grams',
          storeId: 'store-123',
        };

        expect(() => productFP.createProduct(productProps)).toThrow(
          '"minimumStockQuantity" cannot be negative',
        );
      });
    });

    describe('updateStockQuantity', () => {
      it('should update the stock quantity correctly', () => {
        const productProps: ProductProps = {
          id: 'prod-123',
          name: 'Espresso Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 20,
          unit: 'grams',
          storeId: 'store-123',
        };

        const product = productFP.createProduct(productProps);
        const updatedProduct = productFP.updateStockQuantity(product, 80);

        expect(updatedProduct.stockQuantity).toBe(80);
        expect(product.stockQuantity).toBe(100);
      });

      it('should throw an error if the new stock quantity is negative', () => {
        const productProps: ProductProps = {
          id: 'prod-123',
          name: 'Espresso Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 20,
          unit: 'grams',
          storeId: 'store-123',
        };

        const product = productFP.createProduct(productProps);

        expect(() => productFP.updateStockQuantity(product, -50)).toThrow(
          '"stockQuantity" cannot be negative',
        );
      });

      it('should increment stock quantity', () => {
        const productProps: ProductProps = {
          id: 'prod-123',
          name: 'Espresso Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 20,
          unit: 'grams',
          storeId: 'store-123',
        };

        const product = productFP.createProduct(productProps);
        const updated = productFP.incrementStock(product);
        expect(updated.stockQuantity).toBe(101);
      });

      it('should decrement stock quantity', () => {
        const productProps: ProductProps = {
          id: 'prod-123',
          name: 'Espresso Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 20,
          unit: 'grams',
          storeId: 'store-123',
        };

        const product = productFP.createProduct(productProps);
        const updated = productFP.decrementStock(product);
        expect(updated.stockQuantity).toBe(99);
      });

      it('should throw error if decrementing results in negative stock', () => {
        const productProps: ProductProps = {
          id: 'prod-123',
          name: 'Espresso Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 0,
          minimumStockQuantity: 20,
          unit: 'grams',
          storeId: 'store-123',
        };

        const product = productFP.createProduct(productProps);
        expect(() => productFP.decrementStock(product)).toThrow(
          '"stockQuantity" cannot be negative',
        );
      });
    });

    describe('updateMinimumStockQuantity', () => {
      it('should update the minimum stock quantity correctly', () => {
        const productProps: ProductProps = {
          id: 'prod-123',
          name: 'Espresso Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 20,
          unit: 'grams',
          storeId: 'store-123',
        };

        const product = productFP.createProduct(productProps);
        const updatedProduct = productFP.updateMinimumStockQuantity(
          product,
          15,
        );

        expect(updatedProduct.minimumStockQuantity).toBe(15);
        expect(product.minimumStockQuantity).toBe(20);
      });

      it('should throw an error if the new minimum stock quantity is negative', () => {
        const productProps: ProductProps = {
          id: 'prod-123',
          name: 'Espresso Beans',
          priceInCents: 1599,
          roast: 'light',
          stockQuantity: 100,
          minimumStockQuantity: 20,
          unit: 'grams',
          storeId: 'store-123',
        };

        const product = productFP.createProduct(productProps);

        expect(() =>
          productFP.updateMinimumStockQuantity(product, -10),
        ).toThrow('"minimumStockQuantity" cannot be negative');
      });
    });
  });
});
