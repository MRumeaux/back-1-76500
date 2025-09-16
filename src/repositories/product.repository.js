import { productManager } from "../manager/product-manager.js";

class ProductRepository {

    constructor(manager){
        this.manager = manager;
    }

    getProducts = async() => {
        try {
            return await this.manager.find();
        } catch (error) {
            throw new Error(error);
        }
    }
    
    getProductById = async (pid) => {
            try {
                const filteredProduct = await this.manager.findById(pid);
                if (!filteredProduct) throw new Error("Product not found", 404);
                return filteredProduct;
            } catch (error) {
                throw new Error(error);
            }
        }
    
    addProduct = async (product) => {
        
        try {
            const newProduct = await this.manager.create(product);
            if (!newProduct) throw new Error("Product could not be posted", 404);
            return newProduct;
        } catch (error) {
            throw new Error(error);
        }
    }

    updateProduct = async (pid, product) => {
        
        try {
            const updatedProduct = await this.manager.findByIdAndUpdate(pid, product, { new: true });
            if (!updatedProduct) throw new Error("Product was not updated", 404);
            return updatedProduct;
        } catch (error) {
            throw new Error(error);
        }
    }


    deleteProduct = async (pid) => {
        try {
            const deletedProduct = await this.manager.findByIdAndDelete(pid);
            if (!deletedProduct) throw new Error("Product was not deleted", 404);
            return deletedProduct;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const productRepository = new ProductRepository(productManager)