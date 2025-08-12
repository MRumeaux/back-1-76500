import { Router } from "express";
import { cartManager } from "../src/manager/cart-manager.js";

const cartRouter = Router();

router.post("/", async (req, res, next) => {
    try {
        const cart = await cartManager.createCart();
        res.status(200).json(cart);
    } catch (error) {
        next(error)
    }

});

router.get("/:cid", async (req, res, next) => {

    try {
        const {cid} = req.params;
        const seekedProductInCart = await cartManager.getProductInCartById(cid);
        res.status(200).json(seekedProductInCart);
    } catch (error) {
        next(error)
    }
});

router.post("/:cid/product/:pid", async (req, res, next) => {

    try {
        const { cid } = req.params;
        const { pid } = req.params;
        await cartManager.addProductToCart(cid, pid);
    } catch (error) {
        next(error)
    }
});

export default cartRouter;