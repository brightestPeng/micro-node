const Koa = require("koa");
const Router = require("koa-router");
const Seneca = require("seneca");
const SenecaWeb = require("seneca-web");

const app = new Koa();
const seneca = new Seneca({ log: "silent" });
const path = require("path")

function promisify(f) {
  return function () {
    let args = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve, reject) {
      args.push(function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });

      f.apply(null, args);
    });
  };
}

const fs = require("fs");

let test = promisify(fs.stat);

test(path.resolve(__dirname,"./modules/main.js"))
  .then((data) => {
    console.log(data, "data");
  })
  .catch((err) => {
    console.log(err, "err");
  });

seneca
  .use(SenecaWeb, {
    context: Router(),
    adapter: require("seneca-web-adapter-koa2"),
  })
  .use("./modules/main");

seneca.ready(() => {
  // seneca.act("area:api,action:products", (err, data) => {
  //   console.log(data, "products");
  //   console.log(err, "products");
  // });

  app.use(seneca.export("web/context")().routes());
  app.listen(4000, () => {
    console.log("main server listen on port 4000");
  });
});
