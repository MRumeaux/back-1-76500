import fs from "fs"
import { productManager } from "./product-manager.js";

const path = "./src/data/cart.json"

class CartManager {

    constructor(path){
        this.path = path
    }

    async getCarts(){
        try {
            if(fs.existsSync(this.path)){
                const cart = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(cart);
            } return [];
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async createCart(){
        try {
            const cart = await this.getCarts();
            
            const actualCid = cart.length > 0 ? Math.max(...cart.map(cartProduct => cartProduct.cid)) : 0; //Busco máximo ID en array contenedor products para referencia en nuevo producto si fuera necesario
            
            const newCartProduct = {
                cid: actualCid + 1,
                products: []
            };
            cart.push(newCartProduct);
    
            await fs.promises.writeFile(this.path, JSON.stringify(cart));
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductInCartById(cid){
        try {
            const cart = await this.getCarts();
            const filteredCart = cart.find((cart) => cart.cid === Number(cid));
            if(!filteredCart) throw new Error("No se ha encontrado un carrito con el ID solicitado"); 
            return filteredCart;
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