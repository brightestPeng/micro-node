const mongoose = require("../index");

const orderSchema = mongoose.Schema({
  products: [
    {
      name: String,
      price: Number,
      num: Number,
    },
  ],
  total: Number,
});

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;
