import { OrderAttributes } from '../database/models/order';
import { ProductOutput } from '../database/models/product';

export type DataType = {
  products: ProductOutput &
    {
      OrderProducts: {
        quantity: number;
      };
    }[];
} & OrderAttributes;

export function getQuantityForOrders(data: any) {
  return data.map((item) => {
    return {
      ...item.dataValues,
      products: item.dataValues.products.map((product) => {
        const item = {
          ...product.dataValues,
          quantity: product.dataValues.OrderProducts.quantity
        };

        const { OrderProducts, ...rest } = Object.assign({}, item);

        return rest;
      })
    };
  });
}
