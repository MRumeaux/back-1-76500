import { productRepository } from "../repositories/product.repository.js";

class ProductController {

    constructor(repository){
        this.repository = repository;
    }

    getProducts = async (req, res, next) => {
        try {
            const { page, limit, title, sort } = req.query;
            const response = await this.repository.getProducts(page, limit, title, sort);
            const nextPage = response.hasNextPage
                ? `http://localhost:8080/products?page=${response.nextPage}`
                : null;
            const prevPage = response.hasPrevPage
                ? `http://localhost:8080/products?page=${response.hasPrevPage}`
                : null;
            res.status(200).json({
                payload: response.docs,
                info: {
                    count: response.totalDocs,
                    totalPages: response.totalPages,
                    nextLink: nextPage,
                    prevLink: prevPage,
                    hasNextPage: response.hasNextPage,
                    hasPrevPage: response.hasPrevPage,
                }
            })
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