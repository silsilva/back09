import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { modAllUser } from "lib/controllers/user";
import { authMiddelware, handlerCors } from "lib/middleware";

async function handler(req: NextApiRequest, res: NextApiResponse, token: any) {
  const user = await modAllUser(req.body, token.id);
  res.send(user);
}
const met = methods({
  patch: handler,
});
export default handlerCors(authMiddelware(met));
