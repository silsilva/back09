import { NextApiRequest, NextApiResponse } from "next";
import { authMiddelware, handlerCors } from "lib/middleware";
import * as methods from "micro-method-router";
import { User } from "lib/user";

async function getMe(req: NextApiRequest, res: NextApiResponse, token) {
  const user = new User(token.userId);
  await user.getData();
  res.send(user.data);
}
async function patchMe(req: NextApiRequest, res: NextApiResponse, token) {
  const user = new User(token.userId);
  user.setData(req.body);
  await user.push();
  res.status(200).json({
    message: "Usuario modificado correctamente.",
  });
}
const handler = methods({
  get: getMe,
  patch: patchMe,
});

export default handlerCors(authMiddelware(handler));
