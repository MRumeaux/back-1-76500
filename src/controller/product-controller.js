import { productRepository } from "../repositories/product.repository.js";

export const getProducts = async (req, res, next) => {
    try {
        const { page, limit, title, sort } = req.query;
        const response = await productRepository.getProducts(page, limit, title, sort);
        const nextPage = response.hasNextPage
            ? `http://localhost:8080/products?page=${response.nextPage}`
            : null;
        const prevPage = response.hasPrevPage
            ? `http://localhost:8080/products?page=${response.hasPrevPage}`
            : null;
        res.status(200).json({
            status: "success",
            payload: response.docs,
            info: {
                totalPages: response.totalPages,
                prevPage: response.page > 1 ? response.page - 1 : null,
                nextPage: response.page * response.limit < response.totalDocs ? response.page + 1 : null,
                prevLink: prevPage,
                hasNextPage: response.hasNextPage,
                hasPrevPage: response.hasPrevPage,
                page: response.page,
                nextLink: nextPage
            }
        })
    } catch (error) {
        next(error);
    }
}
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const filteredProduct = await productRepository.getProductById(id);
        if (!filteredProduct) return res.status(404).json({ message: "Product not found" })
        res.status(200).json(filteredProduct);
    } catch (error) {
        next(error);
    }
}
export const addProduct = async (req, res, next) => {
    try {
        const product = req.body;
        const addProduct = await productRepository.addProduct(product);
        res.status(201).json(addProduct);
    } catch (error) {
        next(error);
    }
}
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = req.body;
        const updatedProduct = await productRepository.updateProduct(id, product);
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
}
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productRepository.deleteProduct(id);
        res.status(200).json(deletedProduct);
    } catch (error) {
        next(error);
    }
}
