import { productRepository } from "../repositories/product.repository.js";

class ProductController {

    constructor(repository){
        this.repository = repository;
    }

    getProducts = async (req, res, next) => {
        try {
            const products = await this.repository.getProducts();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    getProductById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const filteredProduct = await this.repository.getProductById(id);
            if (!filteredProduct) return res.status(404).json({ message: "Product not found" })
            res.status(200).json(filteredProduct);
        } catch (error) {
            next(error);
        }
    }

    addProduct = async (req, res, next) => {
        try {
            const product = req.body;
            const addProduct = await this.repository.addProduct(product);
            res.status(201).json(addProduct);
        } catch (error) {
            next(error);
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = req.body;
            const updatedProduct = await this.repository.updateProduct(id, product);
            res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    deleteProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedProduct = await this.repository.deleteProduct(id);
            res.status(200).json(deletedProduct);
        } catch (error) {
            next(error);
        }
    }

}

export const productController = new ProductController(productRepository);