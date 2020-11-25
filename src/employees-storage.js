module.exports = function (options) {
  this.add({ role: "employee", cmd: "add" }, function (msg, reply) {
    this.make("employee").data$(msg.data).save$(reply({ msg:"添加成功" }));
  });

  this.find({ role: "employee", cmd: "get" }, function (msg, reply) {
    this.make("employee").load$(msg.id, reply);
  });
};
