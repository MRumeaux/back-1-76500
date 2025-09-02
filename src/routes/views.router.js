import { Router } from "express";
import { productManager } from "../manager/product-manager.js";

const viewsRouter = Router();

viewsRouter.get('/', async(req, res, next)=> {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        next(error);
    }
})

viewsRouter.get('/realtimeproducts', async(req, res, next)=> {
    try {
        res.render('realTimeProducts')
    } catch (error) {
        next(error);
    }
})

export default viewsRouter; 