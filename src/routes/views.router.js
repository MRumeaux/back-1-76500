import { Router } from "express";
import { productManager } from "../manager/product-manager.js";

const productList = Router();

productList.get('/', async(req, res, next)=> {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
})

export default productList;