import { Request, Response } from 'express';

import ProductServices from '../services/product.service';

import { extractRelativePath } from '../helpers/extractRelativePath';
import { UploadedFile } from '../definitions';

async function create(req: Request, res: Response) {
  try {
    const mainImage = (req.files as UploadedFile[]).find((item) => item.fieldname === 'main_image');

    const fields = {
      ...req.body,
      main_image: extractRelativePath(mainImage.path)
    };

    fields.images = (req.files as Express.Multer.File[])
      .filter((item) => item.fieldname === 'images')
      .map((item) => extractRelativePath(item.path));

    const product = await ProductServices.createProduct(fields);

    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({
      error: e.message
    });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await ProductServices.getProductById(id);

    res.status(200).json({
      product: product
    });
  } catch (e) {
    res.status(400).json({
      error: e.message
    });
  }
}

async function get(req: Request, res: Response) {
  try {
    const queries = req.query;
    const { isVerified } = req.body;

    const products = await ProductServices.getAllProducts(queries, isVerified);

    res.status(200).json({
      product: products
    });
  } catch (e) {
    res.status(400).json({
      error: e.message
    });
  }
}
async function deleteById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const info = await ProductServices.deleteProductById(id);
    if (!info) {
      return res.status(203).json({
        message: `There is no product by id ${id}.`
      });
    }

    res.status(200).json({
      message: `The product by id ${id} has successfully deleted.`
    });
  } catch (e) {
    res.status(400).json({
      error: e.message
    });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const info = await ProductServices.updateProductById(id, req.body);

    if (!info) {
      res.status(200).json({
        message: `The product by id ${id} can't be updated.`
      });
    }

    res.status(200).json({
      message: `The product by id ${id} has successfully updated.`
    });
  } catch (e) {
    res.status(400).json({
      error: e.message
    });
  }
}

export default {
  create,
  get,
  getById,
  update,
  deleteById
};
