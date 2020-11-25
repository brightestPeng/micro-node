module.exports = function test(options) {
  this.add("role:api,path:calculate", function (msg, reply) {
    console.log(msg);

    reply({ msg: "success" });
  });

  this.add("role:api,path:test", function (msg, reply) {
    console.log(msg);

    reply({ msg: "test" });
  });

  this.add("init:test", function (msg, reply) {
    this.act(
      "role:web",
      {
        routes: {
          prefix: "/api",
          pin: "role:api,path:*",
          map: {
            calculate: { GET: true, suffix: "/:id" },
            test: { GET: true, suffix: "/:id" },
          },
        },
      },
      reply
    );
  });
};
