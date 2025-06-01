const nodemailer = require("nodemailer");

console.log(process.env.MAIL_USER)
console.log(process.env.MAIL_PASS)

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "triptogether11@gmail.com",
    pass: "zmhikaooinqpitia",
  },
});

module.exports = transporter;
