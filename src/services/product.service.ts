import Product from '../db/models/Product';
import ProductImage from '../db/models/ProductImage';
import Categories from '../db/models/Categories';
import ProductCategory from '../db/models/ProductCategory';

import { IProduct } from '../definitions';

import { createValuesFromReqBody } from '../helpers/createValuesFromReqBody';
import { createWhereClause } from '../helpers/createWhereClause';

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
  images: File[];
}

class ProductService {
  async createProduct(body: createProductParams) {
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
      const productImages = images.map((item) => {
        return {
          imageUrl: item
        };
      });

      const product = await Product.create(
        {
          name: name,
          description: description,
          price: price,
          brand: brand,
          main_image: main_image,
          images: productImages,
          sizes: sizes,
          colors: color,
          isPublished: isPublished
        },
        {
          include: [
            {
              model: ProductImage,
              as: 'images'
            },
            { model: Categories, as: 'category' }
          ]
        }
      );

      await ProductCategory.create({
        productId: product.dataValues.id,
        categoryId: categoryId
      });

      return product;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id: string) {
    try {
      return await Product.findByPk(id, {
        include: [
          { model: ProductImage, as: 'images' },
          { model: Categories, as: 'category' }
        ]
      });
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  async getAllProducts(queries: any, isVerified?: boolean) {
    try {
      const { productWhereClause, categoryWhereClause } = createWhereClause(queries, isVerified);

      return await Product.findAll({
        where: productWhereClause,
        include: [
          { model: ProductImage, as: 'images' },
          { model: Categories, as: 'category', where: categoryWhereClause }
        ]
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProductById(id: string) {
    try {
      return await Product.destroy({
        hooks: true,
        where: {
          id: id
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateProductById(id: string, fields: IProduct) {
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
}

export default new ProductService();
