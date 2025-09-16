import { CartModel } from "../models/cart-model.js";

class CartManager {

    constructor(model){
        this.model = model;
    }

    getCarts = async () => {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(error);
        }
    }
    
    createCart = async () => {
        try {
            return await this.model.create();
        } catch (error) {
            throw new Error(error);
        }
    }

    getProductsInCartById = async (cid) => {
        try {
            return await this.model.findById(cid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProductToCart(cid, pid){
        try {
            const newCart = await this.model.findByIdAndUpdate(
                cid,
                { $push: { pid: pid } },
                { new: true }
            );
            return newCart;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const cartManager = new CartManager(CartModel);