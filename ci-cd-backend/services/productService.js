import db from '../models/dbConnection.js';
import LoggerModule, { logger } from '../utils/logger.js';

export const getAllProducts = async () => {
  const module = 'productService.getAllProducts';
  try {
    const products = await db.product.findAll();
    logger.info(LoggerModule.msg(module, 'Fetched all products successfully'));
    return products;
  } catch (error) {
    logger.error(LoggerModule.msg(module, `Error fetching products: ${error.message}`));
    throw new Error(`Could not fetch products: ${error.message}`);
  }
};

export const getProductById = async (id) => {
  const module = 'productService.getProductById';
  try {
    const product = await db.product.findOne({
      where: { id: id }
    });

    if (!product) {
      logger.warn(LoggerModule.msg(module, `Product not found for ID: ${id}`));
      throw new Error('Product not found');
    }
    logger.info(LoggerModule.msg(module, `Fetched product with ID: ${id}`));
    return product;
  } catch (error) {
    logger.error(LoggerModule.msg(module, `Error fetching product: ${error.message}`));
    throw new Error(`Could not fetch product: ${error.message}`);
  }
};

export const createProduct = async (productData) => {
  const module = 'productService.createProduct';
  try {
    const newProduct = await db.product.create(productData);
    logger.info(LoggerModule.msg(module, `Created product successfully`));
    return newProduct;
  } catch (error) {
    logger.error(LoggerModule.msg(module, `Error creating product: ${error.message}`));
    throw new Error(`Could not create product: ${error.message}`);
  }
};

export const updateProduct = async (id,productData) => {
  const module = 'productService.updateProduct';
  const t = await db.sequelize.transaction();

  try {
    let existingProduct = await db.product.findOne({
      where: { id: id }
    });
    
    if (existingProduct?.dataValues?.id) {
      //update the null or empty columns
      await db.product.update(productData, {
        where: {
          id: id
        },
        transaction: t
      });
    } else {
      //add new Product records
      await db.product.create(productData, {
        transaction: t
      });

    }

    await t.commit();
    logger.info(LoggerModule.msg(module, 'Transaction committed successfully.'));
  } catch (error) {
    await t.rollback();
    logger.error(LoggerModule.msg(module, `Transaction rolled back error: Error name: '${error.name}', Error message: '${error.message}'`));
    throw Error(error.message);
  }

};

export const deleteProduct = async (id) => {
  const module = 'productService.deleteProduct';
  const t = await db.sequelize.transaction();

  try {
    let existingProduct = await db.product.destroy({
      where: { id: id },
      transaction: t
    });
    
    await t.commit();
    logger.info(LoggerModule.msg(module, 'Transaction committed successfully.'));
  } catch (error) {
    await t.rollback();
    logger.error(LoggerModule.msg(module, `Transaction rolled back error: Error name: '${error.name}', Error message: '${error.message}'`));
    throw Error(error.message);
  }

};