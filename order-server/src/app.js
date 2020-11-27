const Koa = require("koa");
const Seneca = require("seneca");
const Router = require("koa-router");
const SenecaWeb = require("seneca-web");

const app = new Koa();
const seneca = new Seneca({ log: "silent" });

seneca
  .use(SenecaWeb, {
    context: Router(),
    adapter: require("seneca-web-adapter-koa2"),
  })
  .use("./modules/orders")
  .listen(4003);

seneca.ready(() => {
  console.log("ready");

  seneca.act("role:web", {
    routes: {
      prefix: "/orders",
      pin: "area:order,action:*",
      map: {
        create: {
          PUT: true,
        },
      },
    },
  });

  app.use(seneca.export("web/context")().routes());
  app.listen(4003, () => {
    console.log("order server listen on port 4003");
  });
});
