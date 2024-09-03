import { products } from "lib/algolia";
import { base } from "lib/airtable";
import { NextApiRequest, NextApiResponse } from "next";
import { handlerCors } from "lib/middleware";
import methods from "micro-method-router";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let newData = [];
  base("Furniture")
    .select({
      view: "All furniture",
    })
    .eachPage(
      async function page(records, fetchNextPage) {
        newData = records.map(function (record) {
          return {
            objectID: record.id,
            ...record.fields,
          };
        });

        fetchNextPage();
      },
      async function done(err) {
        if (err) {
          return;
        }
        await products.replaceAllObjects(newData);
        res.status(200).json(newData.length);
      }
    );
}
const met = methods({
  get: handler,
});
export default handlerCors(met);
