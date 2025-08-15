import { Router } from "express";
import { productManager } from "../manager/product-manager.js";

const productRouter = Router();

productRouter.get('/', async(req, res, next)=> {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
})

productRouter.get('/:pid', async(req, res, next) => {
    try {
        const {pid} = req.params;
        const seekedProduct = await productManager.getProductById(pid);
        res.status(200).json(seekedProduct);
    } catch (error) {
        next(error);
    }
})

productRouter.post('/', async(req, res, next) => {
    try {
        const product = await productManager.addProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
})

productRouter.put('/:pid', async(req, res, next) => {
    try {
        const {pid} = req.params;
        const updatedProduct = await productManager.updateProduct(req.body, pid);
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
})

productRouter.delete('/:pid', async(req, res, next) => {
    try {
        const {pid} = req.params;
        const deletedProduct = await productManager.deleteProduct(pid);
        res.status(200).json(deletedProduct);
    } catch (error) {
        next(error);
    }
})

export default productRouter;
