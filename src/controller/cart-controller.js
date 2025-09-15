import { cartManager } from "../manager/cart-manager.js";

class CartController {
    
    constructor(manager){
        this.manager = manager;
    }

    getCarts = async (req, res, next) => {
        try {
            const carts = await this.manager.getCarts();
            res.status(200).json(carts);
        } catch (error) {
            next(error)
        }
    
    };

    createCart = async (req, res, next) => {
        try {
            const cart = await this.manager.createCart();
            res.status(201).json(cart);
        } catch (error) {
            next(error)
        }
    
    };
    
    getProductsInCartById = async (req, res, next) => {
    
        try {
            const {cid} = req.params;
            const seekedProductInCart = await this.manager.getProductsInCartById(cid);
            res.status(200).json(seekedProductInCart);
        } catch (error) {
            next(error)
        }
    };
    
    addProductToCart = async (req, res, next) => {
    
        try {
            const { cid, pid } = req.params;
            const postedProductInCart = await this.manager.addProductToCart(cid, pid);
            res.status(201).json(postedProductInCart);
        } catch (error) {
            next(error)
        }
    };
    
}

export const cartController = new CartController(cartManager);