import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(name, email, to, subject, html) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const info = await transporter.sendMail({
    from: `${name} <${email}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
}
