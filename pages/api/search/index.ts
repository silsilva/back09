import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFomReq } from "lib/request";
import methods from "micro-method-router";
import { products } from "lib/algolia";
import { handlerCors } from "lib/middleware";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { finalLimit, finalOffset } = getOffsetAndLimitFomReq(req);

  const respuestaAlgolia = await products.search(req.query.q as string, {
    hitsPerPage: finalLimit,
    offset: finalOffset,
    length: finalLimit,
  });

  res.send({
    results: respuestaAlgolia.hits,
    pagination: {
      limit: finalLimit,
      offset: finalOffset,
      total: respuestaAlgolia.nbHits,
    },
  });
}

const handlerAuth = methods({
  get: handler,
});

export default handlerCors(handlerAuth);
