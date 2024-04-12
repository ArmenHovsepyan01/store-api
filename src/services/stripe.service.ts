import stripe from '../config/stripe';
import { createUserParams, ProductUpdateFields } from '../definitions';
import { ProductOutput } from '../database/models/product';
import user from '../database/models/user';

type StripeProductAttributes = Omit<
  ProductOutput,
  | 'id'
  | 'category_id'
  | 'stripeId'
  | 'createdAt'
  | 'updatedAt'
  | 'price'
  | 'brand'
  | 'main_img'
  | 'isPublished'
  | 'user_id'
> & {
  metadata: {
    price: number;
    brand: string;
    main_img: string;
  };
  active: boolean;
};

async function createCustomer(userInfo: createUserParams) {
  try {
    const newCustomer = await stripe.customers.create({
      name: `${userInfo.firstName} ${userInfo.lastName}`,
      email: userInfo.email
    });

    return newCustomer.id;
  } catch (e) {
    throw new Error(e);
  }
}

async function createProduct(product: StripeProductAttributes) {
  try {
    const stripeProduct = await stripe.products.create({ ...product });

    const stripeProductPrice = await stripe.prices.create({
      product: stripeProduct.id,
      currency: 'usd',
      unit_amount: product.metadata.price * 100
    });

    console.log(stripeProductPrice);

    return stripeProduct.id;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

async function deleteProduct(id: string) {
  try {
    const modifiedProduct = await stripe.products.update(id, { active: false });
    const price = await stripe.prices.list({ product: id, active: true });
    await stripe.prices.update(price.data[0].id, { active: false });

    return modifiedProduct;
  } catch (e) {
    throw new Error(e);
  }
}

async function updateProduct(id: string, body: ProductUpdateFields) {
  try {
    const { user_id, price, isPublished, ...rest } = Object.assign({}, body);

    if (Object.values(rest).length !== 0) {
      const updatedProduct = await stripe.products.update(id, { ...rest });

      if (price) {
        const activePrice = await stripe.prices.list({ product: updatedProduct.id, active: true });
        await Promise.all([
          stripe.prices.update(activePrice.data[0].id, { active: false }),
          stripe.prices.create({
            product: updatedProduct.id,
            unit_amount: price * 100,
            currency: 'usd'
          })
        ]);
      }

      return updatedProduct;
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  createCustomer,
  createProduct,
  deleteProduct,
  updateProduct
};
