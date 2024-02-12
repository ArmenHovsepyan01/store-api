import { Request, Response } from "express";
import productService from "../services/ProductService";
import { validationResult } from "express-validator";
import { changeToBase64 } from "../helpers/changeFromUrlToBase64";
import { log } from "console";
import {resolve} from "node:dns";
import Product from "../models/Product";
import ProductService from "../services/ProductService";
import product from "../models/Product";
import * as QueryString from "querystring";

class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      console.log(req.files, req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const fields = {
        ...req.body,
        main_image: req.files[0].path.split("public")[1],
      };

      fields.images = (req.files as Express.Multer.File[])
        .filter((item) => item.fieldname === "images")
        .map((item) => item.path.split("public")[1]);

      console.log(fields);

      await productService.createProduct(fields);
      res.status(200).json(req.body);
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      console.log(req.url)

      res.status(200).json({
        product: product,
      });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const queries = req.query;
      const products = await productService.getAllProducts(queries);
      res.status(200).json({
        product: products,
      });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  async upload(req: Request, res: Response) {
    try {
      console.log(req.body, req.files);
      res.json(req.file);
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  async filterProducts(req: Request, res: Response) {
    try {
      console.log(req.query);
      res.send("ok");
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  async deleteProductById(req: Request, res: Response){
    try {
      const { id } = req.params;
      await ProductService.deleteProductById(id);
      res.status(200).json({
        message: `The product by id ${id} has successfully deleted.`
      });
    } catch (e) {
      res.status(400).json({
        error: e.message
      });
    }
  }

  async updateProduct(req: Request, res: Response){
    try {
      console.log(req.params, req.body);
      const { id } = req.params;
      await productService.updateProductById(id, req.body);
      res.status(200).json({
        message: `The product by id ${''} has successfully updated.`
      })
    } catch (e) {
      res.status(400).json({
        error: e.message
      });
    }
  }
}

export default new ProductController();
