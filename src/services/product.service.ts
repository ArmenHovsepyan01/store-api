import {
  Product,
  Colors,
  Categories,
  Sizes,
  ProductSizes,
  ProductColors,
  ProductImages
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
}

const productIncludes = [
  {
    model: Colors,
    as: 'colors'
  },
  {
    model: Sizes,
    as: 'sizes'
  },
  {
    model: ProductImages,
    as: 'images'
  },
  {
    model: Categories,
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
      isPublished
    } = body;

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
        user_id: 3
      },
      {
        transaction: t
      }
    );

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

    const productImages = images.map((item) => {
      return {
        image_url: item,
        productId: product.id
      };
    });

    await ProductImages.bulkCreate(productImages, {
      transaction: t
    });

    await t.commit();
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

async function getAllProducts(queries: any, isVerified?: boolean) {
  try {
    const { productWhereClause, categoryWhereClause } = createWhereClause(queries, isVerified);

    return await Product.findAll({
      // where: productWhereClause,
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
    const data = await Product.update(values, {
      where: {
        id: id
      }
    });

    console.log(data);
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  createProduct,
  getProductById,
  getAllProducts,
  deleteProductById,
  updateProductById
};
