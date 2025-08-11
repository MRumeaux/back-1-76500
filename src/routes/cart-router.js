import { Router } from "express";
import { cartManager } from "../src/manager/cart-manager.js";

const cartRouter = Router();

router.post("/", async (res, req, next) => {
    try {
        const cart = await cartManager.createCart();
        res.status(200).json(cart);
    } catch (error) {
        next(error)
    }

});

router.get("/:cid", async (res, req, next) => {

    try {
        const {cid} = req.params;
        const seekedProductInCart = await cartManager.getProductInCartById(cid);
        res.status(200).json(seekedProductInCart);
    } catch (error) {
        next(error)
    }
});

router.post("/:cid/product/:pid", async (res, req, next) => {

    try {
        const { cid } = req.params;
        const { pid } = req.params;
        
        await cartManager.saveProdToCart(cid, pid);
    } catch (error) {
        next(error)
    }
        
        // extraer cid y pid de los params de la ruta
    // llamar método de cartManager que busca cart por id
    // llamar método de productManager que busca prod por id
    // llamar método que guarda prod en cart -> si prod ya existe incrementar cantidad, si no existe add cart
});

export default cartRouter;