import { Router } from "express";
import * as productRepository from "../repositories/product.repository.js";
import * as cartRepository from "../repositories/cart.repository.js";

const viewsRouter = Router();

viewsRouter.get('/products', async(req, res, next)=> {
    try {
        const { docs, totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage } = 
            await productRepository.getProducts(req.query.page, req.query.limit, req.query.query, req.query.sort);
        res.render('products', { products: docs, totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage });
    } catch (error) {
        next(error);
    }
})

viewsRouter.get('/products/:pid', async(req, res, next)=> {
    try {
        const { pid } = req.params;
        const product = await productRepository.getProductById(pid);
        res.render('productDetail', { product });
    } catch (error) {
        next(error);
    }
})

viewsRouter.get('/carts/:cid', async(req, res, next)=> {
    try {
        const { cid } = req.params;
        const cart = await cartRepository.getCartById(cid);
        res.render('cart', { cartId: cart._id, products: cart.products });
    } catch (error) {
        next(error);
    }
})

export default viewsRouter; 