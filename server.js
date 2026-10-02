const express = require("express");

const productRoutes = require("./route/productRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});