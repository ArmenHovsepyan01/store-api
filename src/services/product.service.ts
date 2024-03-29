import {
  Product,
  Colors,
  Categories,
  Sizes,
  ProductSizes,
  ProductColors,
  ProductImages,
  Favorites
} from '../database/models/models';

import { IProduct } from '../definitions';

import { createValuesFromReqBody } from '../helpers/createValuesFromReqBody';
import { createWhereClause } from '../helpers/createWhereClause';
import db from '../database/models';

interface createProductParams {
  name: string;
  description: string;
  price: string;
  brand: string;
  sizes: string;
  color: string;
  categoryId: string;
  main_image: string;
  isPublished: boolean;
  images: string[];
  user_id: number;
}

const productIncludes = [
  {
    model: Colors,
    as: 'colors',
    attributes: ['id', 'color'],
    through: {
      attributes: []
    }
  },
  {
    model: Sizes,
    as: 'sizes',
    attributes: ['id', 'size'],
    through: {
      attributes: []
    }
  },
  {
    model: ProductImages,
    as: 'images',
    attributes: ['id', 'image_url']
  },
  {
    model: Categories,
    attributes: ['id', 'category'],
    as: 'category'
  }
];

async function createProduct(body: createProductParams) {
  try {
    const {
      name,
      description,
      price,
      brand,
      main_image,
      images,
      color,
      sizes,
      categoryId,
      isPublished,
      user_id
    } = body;

    console.log(color);

    const t = await db.sequelize.transaction();

    const product = await Product.create(
      {
        name: name,
        description: description,
        price: +price,
        brand: brand,
        isPublished: isPublished,
        main_img: main_image,
        category_id: +categoryId,
        user_id: +user_id
      },
      {
        transaction: t
      }
    );

    // do this with hooks, afterCreate
    await ProductSizes.create(
      {
        product_id: product.id,
        sizes_id: +sizes
      },
      {
        transaction: t
      }
    );

    await ProductColors.create(
      {
        product_id: product.id,
        colors_id: +color
      },
      {
        transaction: t
      }
    );

    await ProductImages.bulkCreate(
      images.map((item) => {
        return {
          image_url: item,
          productId: product.id
        };
      }),
      {
        transaction: t
      }
    );

    await t.commit();

    return product;
  } catch (e) {
    throw new Error(e);
  }
}

async function getProductById(id: string) {
  try {
    return await Product.findByPk(id, {
      include: productIncludes
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function getAllProducts(queries: any, isVerified?: boolean, user_id?: number) {
  try {
    const productWhereClause = createWhereClause(queries, isVerified, user_id);

    return await Product.findAll({
      where: productWhereClause,
      include: productIncludes
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteProductById(id: string) {
  try {
    return await Product.destroy({
      individualHooks: true,
      where: {
        id: id
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function updateProductById(id: string, fields: IProduct) {
  try {
    const values = createValuesFromReqBody(fields);

    return await Product.update(values, {
      where: {
        id: id
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function getUserProducts(id: number) {
  try {
    return await Product.findAll({
      where: {
        user_id: id
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  createProduct,
  getProductById,
  getAllProducts,
  deleteProductById,
  updateProductById,
  getUserProducts
};
