require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

module.exports.sendMailAlert = async (user) => {
    const info = {
        from: 'alert@blockchain.com', // sender address
        to: "himanshu.singh@indicchain.com", // list of receivers
        subject: "New Registration alert", // Subject line
        text: `User ${user} just registered themself on your contract.`, // plain text body
    };
    console.log(await transporter.sendMail(info));
}
