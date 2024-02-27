import { Favorites } from '../database/models/models';
import user from '../database/models/user';

async function getAll(id: number) {
  try {
    return await Favorites.findAll({
      where: {
        user_id: id
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function addToFavorites(user_id: number, product_id: number, decrease: boolean) {
  try {
    const product = await Favorites.findOne({
      where: {
        user_id
        // product_id
      }
    });

    // if (product) {
    //   const newQuantity = decrease
    //     ? product.quantity > 1
    //       ? product.quantity - 1
    //       : product.quantity
    //     : product.quantity + 1;
    //
    //   return await Favorites.update(
    //     {
    //       quantity: newQuantity
    //     },
    //     {
    //       where: {
    //         id: product.id
    //       }
    //     }
    //   );
    // }

    // return await Favorites.create({
    //   user_id,
    //   product_id
    // });

    console.log(product);
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteFromFavorites(id: number) {
  try {
    return Favorites.destroy({
      where: {
        id
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getAll,
  addToFavorites,
  deleteFromFavorites
};
