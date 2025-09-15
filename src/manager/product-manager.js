import { ProductModel } from "../models/product-model.js";

class ProductManager{
    
    constructor(model){
        this.model = model
    }
    
    getProducts = async() => {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(error);
        }
    }
    
    getProductById = async (id) => {
            try {
                return await this.model.findById(id);
            } catch (error) {
                throw new Error(error);
            }
        }
    
    addProduct = async (product) => {
        
        try {
            return await this.model.create(product);
        } catch (error) {
            throw new Error(error);
        }
    }

    updateProduct = async (id, product) => {
        
        try {
            return await this.model.findByIdAndUpdate(id, product, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }


    deleteProduct = async (id) => {
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const productManager = new ProductManager(ProductModel);

