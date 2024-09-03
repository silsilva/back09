import { User } from "lib/user";
import { Auth } from "lib/auth";
import nodemailer from "nodemailer";
export async function sendCodeToEmail(email: string) {
  const dat = await Auth.findByEmail(email);
  const codigo = await dat.data.code;
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILCODE,
    },
  };
  const mensaje = {
    from: process.env.EMAIL,
    to: email,
    subject: "CODIGO",
    text: `${codigo}`,
  };
  const transport = nodemailer.createTransport(config);
  const info = await transport.sendMail(mensaje);
}

export async function validationToProduct(userId, accepted) {
  try {
    const userData = await User.getOneUser(userId);
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILCODE,
      },
    };
    const mensaje = {
      from: process.env.EMAIL,
      to: userData.data().email,
      subject: accepted ? "Pago realizado" : "Pago rechazado",
      html: accepted
        ? `<div><p>¡La compra se realizó de manera correcta!</p></div>`
        : `<div><p>La compra no pudo realizarse</p></div>`,
    };
    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);
    return info;
  } catch (error) {
    throw error;
  }
}
