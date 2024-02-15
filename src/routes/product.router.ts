import { Router } from 'express';

import multer from 'multer';

import storage from '../config/multerStorage';

import productController from '../controllers/product.controller';

import { validate } from '../middleware/validate';
import { getAllProductsForAuthUsers } from '../middleware/getAllProductsForAuthUsers';

import { validateProductCreateBody } from '../validators/createProductValidator';

const router = Router();

const upload = multer({ storage: storage });

router
  .route('/product')
  .post(upload.any(), validate(validateProductCreateBody), productController.create);

router.route('/products').get(getAllProductsForAuthUsers, productController.get);

router
  .route('/product/:id')
  .get(productController.getById)
  .delete(productController.deleteById)
  .put(productController.update);

export default router;
