const Seneca = require("seneca");
const SenecaWeb = require("seneca-web");
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const seneca = Seneca({ log: "silent" });

seneca
  .use(SenecaWeb, {
    context: Router(),
    adapter: require("seneca-web-adapter-koa2"),
  })
  .use("./modules/products");

seneca.ready(() => {
  seneca.act("role:web", {
    routes: {
      prefix: "/products",
      pin: "area:products,action:*",
      map: {
        delete: { GET: false, DELETE: true },
        add: { PUT: true },
        update: { PUT: true },
        query: { GET: true },
        queryAll: { GET: true },
      },
    },
  });

  app.use(seneca.export("web/context")().routes());
  app.listen(3001, () => {
    console.log("shop manage listen on port 3001");
  });
});
