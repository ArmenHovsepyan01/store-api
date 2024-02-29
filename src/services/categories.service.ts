import { Categories } from '../database/models/models';
import { CategoriesOutput } from '../database/models/categories';

async function getAllCategories(): Promise<CategoriesOutput[]> {
  try {
    return await Categories.findAll();
  } catch (e) {
    throw new Error(e);
  }
}

async function createCategory(category: string) {
  try {
    return await Categories.create({ category });
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteCategory(id: number) {
  try {
    await Categories.destroy({
      where: {
        id
      }
    });

    return `Category with id ${id} deleted successfully.`;
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getAllCategories,
  createCategory,
  deleteCategory
};
