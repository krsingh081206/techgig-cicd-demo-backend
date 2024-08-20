import express from 'express';
import oktaAuth from '../middleware/oktaAuth.js';
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
} from '../controllers/productController.js';

const router = express.Router();

router.get('/getProducts', oktaAuth,getAllProductsController);
router.get('/getProduct/:id',oktaAuth,getProductByIdController);
router.post('/createProduct',oktaAuth,createProductController);
router.put('/updateProduct/:id',oktaAuth,updateProductController);
router.delete('/deleteProduct/:id',oktaAuth,deleteProductController);

export default router;
