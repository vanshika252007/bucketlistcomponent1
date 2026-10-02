const database = require("../database/productDatabase");

async function getProducts() {
    return await database.readProducts();
}

async function getProductById(id) {
    let products = await database.readProducts();

    let product = products.find((item) => item.id == id);

    return product;
}

async function createProduct(product) {
    let products = await database.readProducts();

    products.push(product);

    await database.writeProducts(products);

    return product;
}

async function updateProduct(id, data) {
    let products = await database.readProducts();

    let product = products.find((item) => item.id == id);

    if (!product) {
        return null;
    }

    product.name = data.name;
    product.price = data.price;

    await database.writeProducts(products);

    return product;
}

async function patchProduct(id, data) {
    let products = await database.readProducts();

    let product = products.find((item) => item.id == id);

    if (!product) {
        return null;
    }

    if (data.name !== undefined) {
        product.name = data.name;
    }

    if (data.price !== undefined) {
        product.price = data.price;
    }

    await database.writeProducts(products);

    return product;
}

async function deleteProduct(id) {
    let products = await database.readProducts();

    let product = products.find((item) => item.id == id);

    if (!product) {
        return null;
    }

    products = products.filter((item) => item.id != id);

    await database.writeProducts(products);

    return product;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};