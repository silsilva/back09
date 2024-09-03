import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { products } from "lib/algolia";
import { base } from "lib/airtable";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    base("Furniture")
      .select({
        pageSize: 10,
      })
      .eachPage(
        async function (records, fetchNextPage) {
          const object = records.map((r) => {
            return {
              objectID: r.id,
              ...r.fields,
            };
          });
          await products.saveObjects(object);

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          res.send("TERMINADO");
        }
      );

    // const listasFinales = lista.slice(finalOffset, finalOffset + finalLimit);
  },
});
