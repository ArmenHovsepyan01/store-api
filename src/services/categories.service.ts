import { Categories } from '../database/models/models';
import { CategoriesOutput } from '../database/models/categories';

const categoryIncludes = {
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
};

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
    const newCategory = await Categories.create({ category, parent_id });

    return await Categories.findByPk(newCategory.id, { include: categoryIncludes });
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
