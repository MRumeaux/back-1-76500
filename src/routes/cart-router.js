import { Router } from "express";
import { cartManager } from "../src/manager/cart-manager.js";

const cartRouter = Router();

router.post("/", async (res, req, next) => {
    // crear un carrito (cart.json)
    // id + arrays de prods
    try {
        const cart = await cartManager.
    } catch (error) {
        next(error)
    }

});

router.get("/:cid", async (res, req, next) => {
    // debe listar los prods que pertenecen al carrito con el cid proporcionado

    try {
        
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