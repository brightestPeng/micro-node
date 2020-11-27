const seneca = require("seneca")({ log: "silent" });

const senecaProduct = seneca.client(4001);
// const senecaEmail = seneca.client(4002);
const senecaOrder = seneca.client(4003);

const plugin = function () {
  const seneca = this;

  //查询所有商品
  seneca.add({ area: "api", action: "products" }, (msg, reply) => {
    senecaProduct.act({ area: "products", action: "queryAll" }, reply);
  });

  //根据id获取商品信息
  seneca.add({ area: "api", action: "productsById" }, ({ args }, reply) => {
    senecaProduct.act({ area: "products", action: "query", args }, reply);
  });

  //创建购买商品订单
  seneca.add({ area: "api", action: "createOrder" }, ({ args }, reply) => {
    senecaOrder.act({ area: "order", action: "create", args }, reply);
  });

  seneca.add("init:plugin", (msg, reply) => {
    seneca.act(
      "role:web",
      {
        routes: {
          prefix: "/api",
          pin: "area:api,action:*",
          map: {
            products: { GET: true },
            productsById: { GET: true },
            createOrder: { PUT: true },
          },
        },
      },
      reply
    );
  });
};

module.exports = plugin;
