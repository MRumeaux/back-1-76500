import { ProductModel } from "../models/product-model.js";

class ProductManager{
    
    constructor(model){
        this.model = model
    }
    
    getProducts = async(page = 1, limit = 10, name, sort) => {
        try {
            const filter = title ? { 'title': title } : {};
            let sortOrder = {};
            if (sort) sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
            return await this.model.paginate(filter, {page, limit, sort: sortOrder});
        } catch (error) {
            throw new Error(error);
        }
    }
    
    getProductById = async (pid) => {
            try {
                return await this.model.findById(pid);
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

    updateProduct = async (pid, product) => {
        
        try {
            return await this.model.findByIdAndUpdate(pid, product, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }


    deleteProduct = async (pid) => {
        try {
            return await this.model.findByIdAndDelete(pid)
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const productManager = new ProductManager(ProductModel);

