import Product from "../models/Product";
import ProductImage from "../models/ProductImage";
import Categories from "../models/Categories";
import ProductCategory from "../models/ProductCategory";

import { IProduct } from "../definitions";

import { createValuesFromReqBody } from "../helpers/createValuesFromReqBody";
import { Op } from "sequelize"
import * as QueryString from "querystring";
import express from "express";
import {createWhereClause} from "../helpers/createWhereClause";

interface createProductParams {
  name: string;
  description: string;
  price: string;
  brand: string;
  sizes: string;
  color: string;
  categoryId: string;
  main_image: string;
  images: File [];
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
      } = body;
      const productImages = images.map((item) => {
        return {
          imageUrl: item,
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
          colors: color
        },
        {
          include: [
            {
              model: ProductImage,
              as: "images",
            },
            { model: Categories, as: "category" },
          ],
        }
      );

      await ProductCategory.create({
        productId: product.dataValues.id,
        categoryId: categoryId,
      });

      return product;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id: string) {
    try {
      const product = await Product.findByPk(id, {
        include: [
          { model: ProductImage, as: "images" },
          { model: Categories, as: "category" },
        ],
      });

      return product;
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  async getAllProducts(queries: any) {
    try {
      const { productWhereClause, categoryWhereClause } = createWhereClause(queries);
      console.log(productWhereClause, categoryWhereClause)
      const products = await Product.findAll({
        where: productWhereClause,
        include: [
          { model: ProductImage, as: "images" },
          { model: Categories, as: "category", where: categoryWhereClause },
        ],
      });

      return products;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProductById(id: string){
    try {
      return await Product.destroy({
        where: {
          id: id
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateProductById(id: string, fields: IProduct){
    try {
      const values = createValuesFromReqBody(fields);
      console.log(values)
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
