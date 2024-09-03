import { NextApiRequest, NextApiResponse } from "next";
import { authMiddelware } from "lib/middleware";
import methods from "micro-method-router";
import { Order, getOrderById } from "lib/order";
import { schemaMiddelware } from "lib/schemaMiddelware";
import { handlerCors } from "lib/middleware";
import * as yup from "yup";
let querySchema = yup.object().shape({
  orderId: yup.string().required(),
});

async function handler(req: NextApiRequest, res: NextApiResponse, token: any) {
  try {
    querySchema.noUnknown();
    querySchema.validateSync(req.query, { stripUnknown: false });
    const { orderId } = req.query;
    const order = await getOrderById(orderId);
    res.status(200).send(order.data());
  } catch (error) {
    res.status(404).send(error);
  }
}
const validacion = schemaMiddelware(handler);
const met = methods({
  get: validacion,
});
export default handlerCors(authMiddelware(met));
