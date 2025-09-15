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
    
            const cart = await this.getCarts();

            let existingProduct = await productManager.getProductById(pid);
            if (!existingProduct) return `No se encontró el producto id ${pid}`
            
            const seekedCart = cart.find((cart) => cart.cid === Number(cid));
            if (!seekedCart) return `No se encontró el cart id ${cid}`

            const productInCart = seekedCart.products.find((product) => product.pid === Number(pid));

            if (!productInCart){
                const newProductInCart = {
                    pid: Number(pid),
                    quantity: 1
                }
                seekedCart.products.push(newProductInCart);
            } else {
                productInCart.quantity += 1
            }

            await fs.promises.writeFile(this.path, JSON.stringify(cart));
            return seekedCart;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const cartManager = new CartManager(path);