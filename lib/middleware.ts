import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { decode } from "lib/jwt";
import NextCors from "nextjs-cors";

export function authMiddelware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseBearerToken(req);

    if (!token) {
      res.status(401).send("No hay Token");
    }

    const tokenVerify = decode(token);

    if (tokenVerify) {
      callback(req, res, tokenVerify);
    } else {
      res.status(401).send("Token invalido");
    }
  };
}

export function handlerCors(callback) {
  try {
    return async function (req: NextApiRequest, res: NextApiResponse) {
      // Run the cors middleware
      // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
      await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      });

      // Rest of the API logic

      callback(req, res);
      //res.json({ message: "Hello NextJs Cors!" });
    };
  } catch (e) {
    console.log(e);
  }
}
