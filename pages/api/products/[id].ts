import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { searchProductById } from "lib/controllers/products";
import { handlerCors } from "lib/middleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const search = await searchProductById(id as string);
  res.send(search);
}

const handlerAuth = methods({
  get: handler,
});

export default handlerCors(handlerAuth);
