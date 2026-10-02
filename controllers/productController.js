const productService = require("../services/productService");
const cache = require("../middleware/cache");

async function getProducts(req, res) {
    try {
        let products = await productService.getProducts();

        cache.saveCache(req.originalUrl, products);

        res.json(products);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

async function getProductById(req, res) {
    try {
        let id = Number(req.params.id);

        let product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        cache.saveCache(req.originalUrl, product);

        res.json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

async function createProduct(req, res) {
    try {
        let product = await productService.createProduct(req.body);

        cache.clearCache();

        res.status(201).json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

async function updateProduct(req, res) {
    try {
        let id = Number(req.params.id);

        let product = await productService.updateProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        cache.clearCache();

        res.json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

async function patchProduct(req, res) {
    try {
        let id = Number(req.params.id);

        let product = await productService.patchProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        cache.clearCache();

        res.json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

async function deleteProduct(req, res) {
    try {
        let id = Number(req.params.id);

        let product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        cache.clearCache();

        res.json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};