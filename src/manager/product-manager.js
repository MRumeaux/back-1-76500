import { ProductModel } from "../models/product-model.js";

class ProductManager{
    
    constructor(model){
        this.model = model
    }
    
    getProducts = async(limit, page, query, sort) => {
        try {
            const filter = query ? { $or: [{ 'category': query }, { 'status': query } ] } : {};
            const selectedPage = page ? page : 1;
            const selectedLimit = limit ? limit : 10;
            let sortOrder = {};
            if (sort) sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
            return await this.model.paginate(filter, {page: selectedPage, limit: selectedLimit, sort: sortOrder});
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

