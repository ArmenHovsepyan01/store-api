import express, { Router, Request } from 'express';

import multer from 'multer';

import storage from '../config/multerStorage';

import productController from '../controllers/product.controller';

import { validate } from '../middleware/validate';
import { getAllProductsForAuthUsers } from '../middleware/getAllProductsForAuthUsers';

import { validateProductCreateBody } from '../validators/createProductValidator';
import { checkUser } from '../middleware/checkUser';
import * as net from 'net';
import { handleMulterErrors } from '../middleware/handleMulterErrors';

const router = Router();

const upload = multer({
  storage: storage,
  fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|avif)$/)) {
      console.log(2131231231231243324);
      throw 'something went wrong';
    }

    callback(null, true);
  }
});

router
  .route('/product')
  .post(
    upload.single('main_image'),
    handleMulterErrors,
    validate(validateProductCreateBody),
    productController.create
  );

router.route('/products').get(getAllProductsForAuthUsers, productController.get);

router
  .route('/product/:id')
  .get(productController.getById)
  .delete(checkUser, productController.deleteById)
  .put(checkUser, productController.update);

export default router;
