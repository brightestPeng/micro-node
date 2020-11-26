const Seneca = require("seneca");
const SenecaWeb = require("seneca-web");
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const seneca = Seneca();

seneca
  .use(SenecaWeb, {
    context: Router(),
    adapter: require("seneca-web-adapter-koa2"),
  })
  .use("./modules/email");

seneca.ready(() => {
  seneca.act(
    {
      area: "email",
      action: "send",
      to:"2374075638@qq.com",
      text: "Hello Math!",
      subject: "Math",
    },
    (err, result) => {
      console.log(err);
      console.log(result, "result");
    }
  );

  app.use(seneca.export("web/context")().routes());
  app.listen(3002, () => {
    console.log("email server listen on port 3002");
  });
});
