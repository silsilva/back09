import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { favoriteProduct, productAllFavoritos } from "lib/controllers/products";
import { handlerCors, authMiddelware } from "lib/middleware";

async function handler(req: NextApiRequest, res: NextApiResponse, token: any) {
  const product = await productAllFavoritos(token.id);
  res.send(product);
}

async function handlerFovito(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  const body = req.body;
  const product = await favoriteProduct(token.id, body);
  res.send(product);
}

const met = methods({
  get: handler,
  post: handlerFovito,
});
const authMiddlewarePass = authMiddelware(met);

export default handlerCors(authMiddlewarePass);
