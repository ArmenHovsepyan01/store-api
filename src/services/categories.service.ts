import { Categories } from '../database/models/models';
import { CategoriesOutput } from '../database/models/categories';

async function getAllCategories(): Promise<CategoriesOutput[]> {
  try {
    return await Categories.findAll({
      include: {
        model: Categories,
        as: 'subcategories',
        include: [
          {
            model: Categories,
            as: 'subcategories',
            include: [
              {
                model: Categories,
                as: 'subcategories'
              }
            ]
          }
        ]
      },
      where: {
        parent_id: null
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function createCategory(category: string, parent_id?: number) {
  try {
    return await Categories.create({ category, parent_id });
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
