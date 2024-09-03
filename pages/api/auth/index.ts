import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { sendCode } from "lib/controllers/auth";
import { handlerCors } from "lib/middleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.email) {
    const resp = await sendCode(req.body.email);
    res.send(resp);
  } else {
    res.send("Falta DATOS");
  }
}

const handlerAuth = methods({
  post: handler,
});

export default handlerCors(handlerAuth);
