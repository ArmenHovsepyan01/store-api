import { IProduct } from '../definitions';
import { changeToBase64 } from './changeFromUrlToBase64';

export async function modifyProduct(product: IProduct) {
  try {
    const images = await Promise.all(
      product.images.map(async (item) => {
        return {
          id: item.id,
          productId: item.productId,
          imageUrl: await changeToBase64(item.imageUrl)
        };
      })
    );

    const main_image = await changeToBase64(product.main_image);

    product.images = images;
    product.main_image = main_image;

    return product;
  } catch (e) {
    throw new Error(e);
  }
}
