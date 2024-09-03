import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { handlerCors } from "lib/middleware";
import { generate } from "lib/jwt";
import { Auth } from "lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = await Auth.findByEmailAndCode(req.body.email, req.body.code);
  if (!auth) {
    return res.status(401).send({
      message: "Correo electrónico o código incorrecto",
    });
  }

  const expires = auth.isCodeExpired();
  if (expires) {
    return res.status(401).send({
      message: "Token expirado",
    });
  }

  const token = generate({ userId: auth.data.userId });
  return res.send({ token });
}
const handlerAuth = methods({
  post: handler,
});

export default handlerCors(handlerAuth);
