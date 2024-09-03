import type { NextApiRequest, NextApiResponse } from "next";

export function getOffsetAndLimitFomReq(
  req: NextApiRequest,
  maxLimit = 100,
  maxOffset = 100000
) {
  const limit = parseInt((req.query.limit as string) || "0");
  const offset = parseInt((req.query.offset as string) || "0");

  let finalLimit = 10;
  if (limit > 0 && limit < maxLimit) {
    finalLimit = limit;
  } else if (limit > maxLimit) {
    finalLimit = maxLimit;
  }

  const finalOffset = offset < maxOffset ? offset : 0;
  return { finalLimit, finalOffset };
}
