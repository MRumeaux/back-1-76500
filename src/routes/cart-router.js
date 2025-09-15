import { Router } from "express";
import { cartController } from "../controller/product-controller.js";

const cartRouter = Router();

cartRouter.post("/", cartController.createCart);
cartRouter.get("/:cid", cartController.getProductsInCartById);
cartRouter.post("/:cid/product/:pid", cartController.addProductToCart);

export default cartRouter;