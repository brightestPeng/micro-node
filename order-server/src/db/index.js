const mongoose = require("mongoose");
const DATABASE_URL = "mongodb://localhost:27017/shop-manage";


//数据库链接
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongodb connection err:", err);
});

mongoose.connection.on("connected", () => {
  console.log("Mongodb connection success");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb connection disconnected");
});

module.exports = mongoose;
