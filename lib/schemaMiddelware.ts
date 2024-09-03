import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

let querySchema = yup.object().shape({
  productId: yup.string().required(),
});
let queryOrderSchema = yup.object().shape({
  orderId: yup.string().required(),
});
let bodySchema = yup
  .object()
  .shape({
    color: yup.string(),
    tamaño: yup.string(),
  })
  .strict();
export function schemaMiddelware(callback) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse,
    token: string
  ) {
    if (req.query.productId) {
      try {
        await querySchema.validate({ productId: req.query.productId });
      } catch (e) {
        res.status(400).json({ e });
        throw "Error con el productId";
      }
    }
    if (req.query.orderId) {
      try {
        await queryOrderSchema.validate({ orderId: req.query.orderId });
      } catch (e) {
        res.status(400).json({ e });
        throw "Error con el orderId";
      }
    }
    if (req.body) {
      try {
        await bodySchema.validate(req.body);

        callback(req, res, token);
      } catch (e) {
        res.status(400).json({ e });
        throw "Error con el body";
      }
    }
  };
}
