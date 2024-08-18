import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productService.js';
import LoggerModule, { logger } from '../utils/logger.js';

export const getAllProductsController = async (req, res) => {
  const module = 'productController.getAllProducts';
  try {
    const products = await getAllProducts();
    logger.info(LoggerModule.msg(module, 'Returned all products'));
    res.status(200).json(products);
  } catch (error) {
    logger.error(LoggerModule.msg(module, `Error in getAllProductsController: ${error.message}`));
    res.status(500).json({ error: error.message });
  }
};

export const getProductByIdController = async (req, res) => {
  const module = 'productController.getProductById';
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    logger.info(LoggerModule.msg(module, `Returned product with ID: ${id}`));
    res.status(200).json(product);
  } catch (error) {
    logger.error(LoggerModule.msg(module, `Error in getProductByIdController: ${error.message}`));
    res.status(404).json({ error: error.message });
  }
};

export const createProductController = async (req, res) => {
  const module = 'productController.createProduct';
  try {
    const newProduct = await createProduct(req.body);
    logger.info(LoggerModule.msg(module, `Created product: ${JSON.stringify(newProduct)}`));
    res.status(201).json(newProduct);
  } catch (error) {
    logger.error(LoggerModule.msg(module, `Error in createProductController: ${error.message}`));
    res.status(500).json({ error: error.message });
  }
};

export const updateProductController = async (req, res) => {
  const module = 'productController.updateProduct';
  const { id } = req.params;
  try {
 
    await updateProduct(id,req.body);
    const statusMessage = {"status" : "success"};
    logger.info(LoggerModule.msg(module, 'Update product'));
    res.status(200).json(statusMessage);
  } catch (error) {
    logger.error(LoggerModule.msg(module, `Error in updateProductController: ${error.message}`));
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  const module = 'productController.deleteProduct';
  const { id } = req.params;
  try {
 
    await deleteProduct(id);
    const statusMessage = {"status" : "success"};
    logger.info(LoggerModule.msg(module, 'Delete product'));
    res.status(200).json(statusMessage);
  } catch (error) {
    logger.error(LoggerModule.msg(module, `Error in deleteProductController: ${error.message}`));
    res.status(500).json({ error: error.message });
  }
};
