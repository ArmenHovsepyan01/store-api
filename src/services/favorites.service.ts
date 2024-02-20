import { Favorites } from '../database/models/models';

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

async function addToFavorites(user_id: number, product_id: number) {
  try {
    return await Favorites.create({
      user_id,
      product_id
    });
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
