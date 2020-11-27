const nodemailer = require("nodemailer");

let userEmail = "997450807@qq.com";
let userKey = "bxgqgldjhodabajb";

let transporter = nodemailer.createTransport({
  service: "qq",
  port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: userEmail,
    pass: userKey,
  },
});

const plugin = function (options) {
  const seneca = this;

  seneca.add({ area: "email", action: "send" }, (msg, reply) => {
    let mailOpt = {
      from: userEmail, // 你到qq邮箱地址
      to: msg.to, // 接受人,可以群发填写多个逗号分隔
      //邮件名
      subject: msg.subject,
      // 可以发送text或者html格式,2选1
      // text: 'Hello world?', // 纯文本
      html: msg.html,
    };

    transporter.sendMail(mailOpt, (error, info) => {
      if (error) {
        reply({ code: -1, error });
      }
      reply(null, { code: 1, msg: `邮件已发送成功,邮件id: ${info.messageId}` });
    });
  });
};

module.exports = plugin;
