import { Router } from "express";
import { productManager } from "../manager/product-manager.js";

const productList = Router();

productList.get('/realtimeproducts', async(req, res, next)=> {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        next(error);
    }
})

export default productList; 