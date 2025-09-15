import { productManager } from "../manager/product-manager";

class ProductController {

    constructor(manager){
        this.manager = manager;
    }

    getProducts = async (req, res, next) => {
        try {
            const products = await this.manager.getProducts();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    getProductById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const filteredProduct = await this.manager.getProductById(id);
            if (!filteredProduct) return res.status(404).json({ message: "Product not found" })
            res.status(200).json(filteredProduct);
        } catch (error) {
            next(error);
        }
    }

    addProduct = async (req, res, next) => {
        try {
            const product = req.body;
            const addProduct = await this.manager.addProduct(product);
            res.status(201).json(addProduct);
        } catch (error) {
            next(error);
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = req.body;
            const updatedProduct = await this.manager.updateProduct(id, product);
            res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    deleteProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedProduct = await this.manager.deleteProduct(id);
            res.status(200).json(deletedProduct);
        } catch (error) {
            next(error);
        }
    }

}

export const productController = new ProductController(productManager);