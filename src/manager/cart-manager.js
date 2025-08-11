import fs from "fs"

const path = "./src/data/cart.json"

class CartManager {

    constructor(path){
        this.path = path
    }

    async getCart(){
        if(fs.existsSync(this.path)){
            const cart = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(cart);
        } return [];
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

    async updateCart(cid, pid){
            
        try {
    
            const cart = await this.getCart();
            let existingCartProduct = await this.getProductInCartById(cid);

            existingCartProduct = { ...existingCartProduct, ...cart };
            const renewCart = cart.filter((product) => product.pid !== pid);

            renewCart.push(existingCartProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(renewCart));
            return existingCartProduct;
        } catch (error) {
            throw error;
        }
    }

}

export const cartManager = new CartManager(path);