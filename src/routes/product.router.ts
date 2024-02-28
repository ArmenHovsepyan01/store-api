import { Router, Request } from 'express';

import multer from 'multer';

import storage from '../config/multerStorage';

import productController from '../controllers/product.controller';

import { validate } from '../middleware/validate';
import { getAllProductsForAuthUsers } from '../middleware/getAllProductsForAuthUsers';

import { validateProductCreateBody } from '../validators/createProductValidator';
import { checkUser } from '../middleware/checkUser';
import { unsupportedFileMiddleware } from '../middleware/handleMulterErrors';

const router = Router();

const upload = multer({
  storage: storage,
  fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|avif)$/)) {
      return callback(new Error('Unsupported files'));
    }

    callback(null, true);
  }
});

router
  .route('/product')
  .post(upload.any(), validate(validateProductCreateBody), productController.create);

router.route('/products').get(getAllProductsForAuthUsers, productController.get);
router.route('/user-products').get(getAllProductsForAuthUsers, productController.getUserProducts);

router
  .route('/product/:id')
  .get(productController.getById)
  .delete(checkUser, productController.deleteById)
  .put(checkUser, productController.update);

export default router;
