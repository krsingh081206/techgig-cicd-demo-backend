import express from 'express';
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController
} from '../controllers/productController.js';

const router = express.Router();

router.get('/getProducts', getAllProductsController);
router.get('/getProduct/:id', getProductByIdController);
router.post('/createProduct', createProductController);
router.put('/updateProduct', updateProductController);

export default router;
