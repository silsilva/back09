import { NextApiRequest, NextApiResponse } from "next";
import { authMiddelware } from "lib/middleware";
import methods from "micro-method-router";
import { Order, getOrders } from "lib/order";
import { handlerCors } from "lib/middleware";
async function handler(req: NextApiRequest, res: NextApiResponse, token: any) {
  try {
    const userOrders = await getOrders(token.userId);
    const orders = [];
    for (let order of userOrders.docs) {
      orders.push(order.data());
    }
    res.status(200).send(orders);
  } catch (error) {
    res.status(404).send(error);
  }
}
const met = methods({
  get: handler,
});
export default handlerCors(authMiddelware(met));
