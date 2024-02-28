import { Favorites, Product } from '../database/models/models';
import user from '../database/models/user';
import { getAllProductsForAuthUsers } from '../middleware/getAllProductsForAuthUsers';
import product from '../database/models/product';
import { createFavoritesValues } from '../helpers/createFavoritesValues';
import { filterData } from '../helpers/filterData';
import { Op } from 'sequelize';

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
        user_id,
        product_id
      }
    });

    if (product) {
      const newQuantity = decrease
        ? product.quantity > 1
          ? product.quantity - 1
          : product.quantity
        : product.quantity + 1;

      await Favorites.update(
        {
          quantity: newQuantity
        },
        {
          where: {
            id: product.id
          }
        }
      );

      return {
        ...product,
        quantity: newQuantity
      };
    }

    const newFavorites = await Favorites.create({
      user_id,
      product_id
    });

    return newFavorites.dataValues;
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteFromFavorites(user_id: number, product_id: number) {
  try {
    return Favorites.destroy({
      where: {
        user_id,
        product_id
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function syncFavorites(favorites_data: any, id: number) {
  try {
    const userFavoritesData = await Favorites.findAll({
      where: {
        user_id: id
      }
    });

    const values = createFavoritesValues(favorites_data, id);
    await Favorites.destroy({
      where: {
        user_id: id
      }
    });

    await Favorites.bulkCreate(values);

    return await Favorites.findAll({
      where: {
        user_id: id
      },
      include: {
        model: Product,
        as: 'product'
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getAll,
  addToFavorites,
  deleteFromFavorites,
  syncFavorites
};
