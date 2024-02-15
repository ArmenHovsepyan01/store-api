import { Request, Response } from 'express';

import ProductServices from '../services/product.service';

import { extractRelativePath } from '../helpers/extractRelativePath';

async function create(req: Request, res: Response) {
  try {
    const fields = {
      ...req.body,
      main_image: extractRelativePath(req.files[0].path)
    };

    console.log(extractRelativePath(req.files[0].path));
    fields.images = (req.files as Express.Multer.File[])
      .filter((item) => item.fieldname === 'images')
      .map((item) => extractRelativePath(item.path));

    await ProductServices.createProduct(fields);
    res.status(200).json(req.body);
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
    await ProductServices.deleteProductById(id);
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
    console.log(req.params, req.body);
    const { id } = req.params;
    await ProductServices.updateProductById(id, req.body);
    res.status(200).json({
      message: `The product by id ${''} has successfully updated.`
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
