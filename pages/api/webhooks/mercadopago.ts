import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "lib/models/order";
import { User } from "lib/models/user";
//import { sendinblueCompra } from "lib/sendinblue";
import { Auth } from "lib/auth";
import { sendCode } from "lib/controllers/auth";
import { handlerCors } from "lib/middleware";
import methods from "micro-method-router";

async function handler(email) {
  //   const { id, topic } = req.query;
  //   console.log(id, topic);
  //   if (topic == "merchant_order") {
  //     const order = await getMerchantOrder(id);
  //     if (order.order_status == "paid") {
  //       const orderId = order.external_reference;
  //       const newOrder = new Order(orderId);
  //       await newOrder.pull();
  //       newOrder.data.status = "closed";
  //       await newOrder.push();
  //       if (newOrder.data.status == "closed") {
  //         console.log(newOrder.data.userId);
  //         const user = new User(newOrder.data.userId);
  //         await user.pull();
  //         console.log(user.data);
  //         await Auth.findByEmail(email);
  //         const codigo = await dat.data.code;
  //         const config = {
  //           host: "smtp.gmail.com",
  //           port: 587,
  //           auth: {
  //             user: process.env.EMAIL,
  //             pass: process.env.EMAILCODE,
  //           },
  //         };
  //         const mensaje = {
  //           from: process.env.EMAIL,
  //           to: email,
  //           subject: "CODIGO",
  //           text: `${codigo}`,
  //         };
  //         res.send("todo bien");
  //       }
  //     }
  //   }
}
const handlerAuth = methods({
  post: handler,
});

export default handlerCors(handlerAuth);
