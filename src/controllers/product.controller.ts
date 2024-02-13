import { Request, Response } from "express";
import productService from "../services/product.service";
import { validationResult } from "express-validator";
import { changeToBase64 } from "../helpers/changeFromUrlToBase64";
import { log } from "console";
import { resolve } from "node:dns";
import Product from "../db/models/Product";
import ProductService from "../services/product.service";
import product from "../db/models/Product";
import * as QueryString from "querystring";
import { extractRelativePath } from "../helpers/extractRelativePath";

class ProductController {
  async create(req: Request, res: Response) {
    try {
      const fields = {
        ...req.body,
        main_image: req.files[0].path.split("public")[1],
      };

      console.log(req.files[0].path);
      fields.images = (req.files as Express.Multer.File[])
        .filter((item) => item.fieldname === "images")
        .map((item) => item.path.split("public")[1]);

      await productService.createProduct(fields);
      res.status(200).json(req.body);
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);

      res.status(200).json({
        product: product,
      });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const queries = req.query;
      const { isVerified } = req.body;

      const products = await productService.getAllProducts(queries, isVerified);

      res.status(200).json({
        product: products,
      });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ProductService.deleteProductById(id);
      res.status(200).json({
        message: `The product by id ${id} has successfully deleted.`,
      });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      console.log(req.params, req.body);
      const { id } = req.params;
      await productService.updateProductById(id, req.body);
      res.status(200).json({
        message: `The product by id ${""} has successfully updated.`,
      });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }
}

export default new ProductController();
