const connect = require("../db/connect");
const products = connect("products");

const plugins = function (options) {
  const seneca = this;

  //添加商品
  seneca.add({ area: "products", action: "add" }, async ({ args }, reply) => {
    const product = await products.find({ name: args.body.name });
    if (product.length > 0) {
      reply(null, { code: -1, msg: "商品已存在" });
    } else {
      const result = await products.add(args.body);
      reply(null, { code: 1, msg: "添加成功!" });
    }
  });

  //删除商品名删除商品
  seneca.add(
    { area: "products", action: "delete" },
    async ({ args }, reply) => {
      const { deletedCount } = await products.remove({ name: args.query.name });
      if (deletedCount >= 1) {
        reply(null, { code: 1, msg: "删除成功!" });
      } else {
        reply(null, { code: -1, msg: "商品不存在，删除失败" });
      }
    }
  );

  //更新商品
  seneca.add(
    { area: "products", action: "update" },
    async ({ args }, reply) => {
      const { nModified } = await products.update(args.body.current, {
        $set: {
          ...args.body.target,
        },
      });

      if (nModified >= 1) {
        reply(null, { code: 1, msg: "修改成功!" });
      } else {
        reply(null, { code: -1, msg: "商品不存在，修改失败" });
      }
    }
  );

  //获取所有商品列表
  seneca.add({ area: "products", action: "queryAll" }, async (msg, reply) => {
    const list = await products.find();
    reply(null, { code: 1, msg: "查询成功", data: list });
  });

  //根据类别获取商品
  seneca.add({ area: "products", action: "query" }, async ({ args }, reply) => {
    if (args.query.id) {
      args.query._id = args.query.id;
      delete args.query.id;
    }

    const list = await products.find(args.query);
    reply(null, { code: 1, msg: "查询成功", data: list });
  });
};

module.exports = plugins;
