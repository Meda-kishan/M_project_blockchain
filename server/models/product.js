const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    companyContractAddress: String,
    productId: String,
    manufactureId: String,
    productName: String,
    productBrand: String
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;