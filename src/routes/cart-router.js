import { Router } from "express";
import { cartManager } from "../manager/cart-manager.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res, next) => {
    try {
        const cart = await cartManager.createCart();
        res.status(201).json(cart);
    } catch (error) {
        next(error)
    }

});

cartRouter.get("/:cid", async (req, res, next) => {

    try {
        const {cid} = req.params;
        const seekedProductInCart = await cartManager.getProductInCartById(cid);
        res.status(200).json(seekedProductInCart);
    } catch (error) {
        next(error)
    }
});

cartRouter.post("/:cid/product/:pid", async (req, res, next) => {

    try {
        const { cid, pid } = req.params;
        const postedProductInCart = await cartManager.addProductToCart(cid, pid);
        res.status(201).json(postedProductInCart);
    } catch (error) {
        next(error)
    }
});

export default cartRouter;