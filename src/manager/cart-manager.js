import fs from "fs"
import { productManager } from ".product-manager.js";
import { error } from "console";

const path = "./src/data/cart.json"

class CartManager {

    constructor(path){
        this.path = path
    }

    async getCart(){
        try {
            if(fs.existsSync(this.path)){
                const cart = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(cart);
            } return [];
        } catch (error) {
            throw error
        }
    }
    
    async createCart(){
        try {
            const cart = await this.getCart();
            
            const actualCid = cart.length > 0 ? Math.max(...cart.map(cartProduct => cartProduct.cid)) : 0; //Busco máximo ID en array contenedor products para referencia en nuevo producto si fuera necesario
            
            const newCartProduct = {
                cid: actualCid + 1,
                products: []
            };
            cart.push(newCartProduct);
    
            await fs.promises.writeFile(this.path, JSON.stringify(cart));
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getProductInCartById(cid){
        try {
            const cart = await this.getCart();
            const filteredCart = cart.find((cart) => cart.cid === Number(cid));
            if(!filteredCart) throw new Error("No se ha encontrado un producto en el carrito con el ID solicitado"); 
            return filteredCart;
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cid, pid){
            
        try {
    
            const cart = await this.getCart();

            let existingProduct = await productManager.getProductById(pid);
            if (!existingProduct) return `No se encontró el producto id ${pid}`
            
            const filteredCart = cart.find((cart) => cart.cid === Number(cid));
            if (!filteredCart) return `No se encontró el cart id ${cid}`

            const productInCart = filteredCart.products.find((product) => product.pid === Number(pid));

            if (!productInCart){
                const newProductInCart = {
                    pid: Number(pid),
                    quantity: 1
                }
                filteredCart.products.push(newProductInCart);
            } else {
                productInCart.quantity += 1
            }

            await fs.promises.writeFile(this.path, JSON.stringify(cart));
            return filteredCart;
        } catch (error) {
            throw error;
        }
    }

}

export const cartManager = new CartManager(path);