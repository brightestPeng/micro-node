const connect = require("../db/connect");

const OrdersDb = connect("orders");
const ProductsDb = connect("products");
const senecaEmailer = require("seneca")({ log:"silent" }).client(4002);

const plugin = function () {
  const seneca = this;

  //获取订单
  seneca.add({ area: "order", action: "query" }, ({ args }, reply) => {
    reply();
  });

  //创建订单
  seneca.add({ area: "order", action: "create" }, async ({ args }, reply) => {
    const { products } = args.body;
    let total = 0.0;

    for (let item of products) {
      const result = await ProductsDb.find({ name: item.name });
      if (result[0]) {
        total += item.num * result[0].price;
        item.price = result[0].price;
      }
    }

    const result = await OrdersDb.add({ products, total });
    if (result) {
      reply(null, { code: 1, msg: "创建订单成功" });

      let html = "";
      result.products.forEach((item) => {
        html += `
          <tr>
            <td>${item.name}</td>
            <td>${item.num}</td>
            <td>${item.price}</td>
            <td>${item.price * item.num}</td>
          </tr>
          `;
      });
      
      senecaEmailer.act(
        {
          area: "email",
          action: "send",
          to: "2374075638@qq.com",
          html: ` 
          <table>
            <thead>
              <th>商品名称</th>
              <th>商品数量</th>
              <th>单价价</th>
              <th>总价</th>
            </thead>
            <tbody>
            ${html}
            </tbody>
        </table>`,
          subject: "Math",
        },
        (err, result) => {
          console.log(err);
          console.log(result, "result");
        }
      );
    }
  });

  //删除已有订单
  // seneca.remove({ area: "order", action: "remove" }, (mgs, reply) => {
  //   reply();
  // });
};

module.exports = plugin;
