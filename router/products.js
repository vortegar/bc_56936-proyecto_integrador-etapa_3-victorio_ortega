import express from 'express';
import productsController from '../controller/products.js';
import upload from '../controller/uploader.js';

const routerProducts = express.Router();
routerProducts.get('/', productsController.getProducts);
routerProducts.get('/:id', productsController.getProduct);
routerProducts.post('/',upload.single('img'), productsController.postProduct);
routerProducts.put('/:id', productsController.putProduct);
routerProducts.delete('/:id', productsController.deleteProduct);


export default routerProducts;
