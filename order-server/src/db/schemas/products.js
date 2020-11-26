const mongoose = require("../index");

const productSchema = mongoose.Schema({
  name: String,
  city: String,
  sales: Number,
  price: Number,
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
