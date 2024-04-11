import stripe from '../config/stripe';
import { createUserParams } from '../definitions';
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

    return stripeProduct.id;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

async function deleteProduct(id: string) {
  try {
    return await stripe.products.del(id);
  } catch (e) {
    throw new Error(e);
  }
}

async function updateProduct(id: string, body: StripeProductAttributes) {
  try {
    return await stripe.products.update(id, { ...body });
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
