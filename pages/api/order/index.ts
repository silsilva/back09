import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddelware, handlerCors } from "lib/middleware";
import * as methods from "micro-method-router";
import { newOrder } from "lib/controllers/orders";

async function handler(req: NextApiRequest, res: NextApiResponse, token: any) {
  if (!req.query.productId) {
    res.status(404).json({ error: "Product not found" });
  }
  const order = await newOrder({
    aditionalInfo: req.body,
    productId: req.query.productId as any,
    userId: token.userId,
    status: "pending",
  });
  res.send({ url: order.url, orderId: order.orderId });
}

const met = methods({
  post: handler,
});
export default handlerCors(authMiddelware(met));
